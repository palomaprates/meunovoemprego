import axios from "axios";
import * as cheerio from "cheerio";
import * as iconv from "iconv-lite";
import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/scheduler";
import { Timestamp } from "firebase-admin/firestore";
import { trigramFromArray } from "../../utils/trigramFromArray";
import { olxList } from "./olxList";

admin.initializeApp();
const db = admin.firestore();

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

async function getJobsFromOlxUrl(jobs: IJob[], item: Item): Promise<void> {
  const { data } = await axios.get(item.url, { responseType: "arraybuffer" });
  const decodedData = iconv.decode(Buffer.from(data), "utf-8");
  const $ = cheerio.load(decodedData);
  const listItems = $(".jobs-ad-card");

  listItems.each((index, element) => {
    const name = $(element).find("h4").first().text().trim();
    const company = $(element)
      .find("span:contains('Nome Empresa:')")
      .text()
      .replace("Nome Empresa: ", "")
      .trim();
    const href = "https://olx.pt" + $(element).find("a").attr("href");
    const olxDate = $(element).find(".css-zmjp5b").first().text().trim();
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
      company: company || "Não especificado",
      href,
      createdAt: Timestamp.fromDate(finalDate),
      index: trigramFromArray([name, company]),
    };
    if (isToday(finalDate, today)) jobs.push(job);
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
        await db.collection("vacancies").doc().set(job);
        console.log("Job added", job.category);
      })
    );
    await db
      .collection("logs")
      .doc("lastRunOlx")
      .set({ lastRun: Timestamp.now() });
  }
);
