// import axios from "axios";
import * as cheerio from "cheerio";
import * as iconv from "iconv-lite";
import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/scheduler";
import { Timestamp } from "firebase-admin/firestore";
import { trigramFromArray } from "../../utils/trigramFromArray";
import { olxList } from "./olxList";
import { getFirestore } from "firebase-admin/firestore";

admin.initializeApp();

interface Item {
  url: string;
  location: string;
  category: string;
}

interface IJob {
  source: string;
  name: string;
  location: string;
  category: string;
  company: string;
  href: string;
  createdAt: Timestamp;
  index: { [key: string]: boolean };
}
function convertMonth(month: string) {
  if (month == "janeiro") {
    return "01";
  } else if (month == "fevereiro") {
    return "02";
  } else if (month == "março") {
    return "03";
  } else if (month == "abril") {
    return "04";
  } else if (month == "maio") {
    return "05";
  } else if (month == "junho") {
    return "06";
  } else if (month == "julho") {
    return "07";
  } else if (month == "agosto") {
    return "08";
  } else if (month == "setembro") {
    return "09";
  } else if (month == "outubro") {
    return "10";
  } else if (month == "novembro") {
    return "11";
  } else if (month == "dezembro") {
    return "12";
  }
  return "-1";
}

function isToday(finalDate: Date, today: Date) {
  return (
    finalDate.getDate() == today.getDate() &&
    finalDate.getMonth() == today.getMonth() &&
    finalDate.getFullYear() == today.getFullYear()
  );
}

const existUrl = async (href: string) => {
  const collectionRef = getFirestore().collection("vacancies");
  const filteredCollection = collectionRef.where("href", "==", href);
  const querySnapshot = await filteredCollection.get();
  return !querySnapshot.empty;
};

const cleanDuplicates = async () => {
  const collectionRef = getFirestore().collection("vacancies");
  const snapshot = await collectionRef.get();

  if (snapshot.empty) return;

  const urlMap = new Map();
  const duplicates: string[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    const href = data.href.trim().toLowerCase();
    if (urlMap.has(href)) {
      duplicates.push(doc.id);
    } else {
      urlMap.set(href, doc.id);
    }
  });
  const deletePromises = duplicates.map((docId) =>
    collectionRef.doc(docId).delete()
  );
  await Promise.all(deletePromises);
};

const deleteOldDocuments = async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 4);
  const collectionReference = getFirestore().collection("vacancies");
  const filterCollection = collectionReference.where(
    "createdAt",
    "<",
    Timestamp.fromDate(threeDaysAgo)
  );
  const qSnapshot = await filterCollection.get();
  if (qSnapshot.empty) return;
  const deletePromises = qSnapshot.docs.map((doc) => {
    return doc.ref.delete();
  });
  await Promise.allSettled(deletePromises);
};

async function getJobsFromOlxUrl(jobs: IJob[], item: Item): Promise<void> {
  const response = await fetch(item.url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
      "Accept-Language": "pt-PT,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      Referer: "https://www.olx.pt/",
    },
  });
  const arrayBuffer = await response.arrayBuffer();
  const decodedData = iconv.decode(Buffer.from(arrayBuffer), "utf-8");
  const $ = cheerio.load(decodedData);

  const listItems = $(".jobs-ad-card");

  listItems.each((_index, element) => {
    (async () => {
      const name = $(element).find("h4").first().text().trim();
      // const titleElement = $(element).find("a:has(h4)").first();
      const aTag = $(element).find("a.css-13gxtrp").first();
      const company = $(element)
        .find("div:contains('Nome Empresa:')")
        .text()
        .replace("Nome Empresa: ", "")
        .trim();
      const href = "https://olx.pt" + aTag.attr("href");
      const olxDate = $(element).find(".css-1h96hyx").first().text().trim();
      const str = olxDate.split(" de ");
      const month = str[1];
      const day = str[0].replace("Para o topo a ", "");
      const year = str[2];
      const finalStrDate = `${year}/${convertMonth(month)}/${day}`;
      let finalDate = new Date();
      if (!olxDate.includes("Hoje")) finalDate = new Date(finalStrDate);

      const today = new Date();
      const job: IJob = {
        source: "Olx",
        name,
        location: item.location,
        category: item.category,
        company: "Não especificado",
        href,
        createdAt: Timestamp.fromDate(finalDate),
        index: trigramFromArray([name, company]),
      };
      if (!(await existUrl(href)) && isToday(finalDate, today)) jobs.push(job);
    })();
  });
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJobsOlx(): Promise<IJob[]> {
  const jobs: IJob[] = [];
  const now = new Date();

  let i = 0;
  for (const item of olxList) {
    await getJobsFromOlxUrl(jobs, item);
    const random = Math.floor(Math.random() * 4) + 1;
    await sleep(random * 1000);
    console.log("Sleeping for", random, "seconds");
    console.log("Elapsed time", (new Date().getTime() - now.getTime()) / 1000);
    i++;
    console.log("Finished", i, "of", olxList.length);
  }
  return jobs;
}

export const periodicOlx = onSchedule(
  { schedule: "every 24 hours", timeoutSeconds: 540, memory: "1GiB" },
  async () => {
    const olxJobs = await getJobsOlx();
    await Promise.all(
      olxJobs.map(async (job) => {
        await getFirestore().collection("vacancies").doc().set(job);
        console.log("Job added", job.category);
      })
    );

    await cleanDuplicates();

    await getFirestore()
      .collection("logs")
      .doc("lastRunOlx")
      .set({ lastRun: Timestamp.now() });

    await deleteOldDocuments();
  }
);
