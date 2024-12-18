// import * as functions from "firebase-functions/v1";
// import axios from "axios";
// import * as cheerio from "cheerio";
// import * as iconv from "iconv-lite";
// import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/scheduler";
// import { Timestamp } from "firebase-admin/firestore";

// admin.initializeApp();
// const db = admin.firestore();
// interface Item {
//   url: string;
//   location: string;
//   category: string;
// }

// interface IJob {
//   source: string;
//   name: string;
//   location: string;
//   category: string;
//   company: string;
//   href: string;
//   createdAt: Timestamp;
// }

// async function getOlx(jobs: IJob[], item: Item): Promise<void> {
//   const { data } = await axios.get(item.url, { responseType: "arraybuffer" });
//   const decodedData = iconv.decode(Buffer.from(data), "utf-8");
//   const $ = cheerio.load(decodedData);
//   const listItems = $(".jobs-ad-card");

//   listItems.each((index, element) => {
//     const name = $(element).find("h4").first().text().trim();
//     const company = $(element)
//       .find("span:contains('Nome Empresa:')")
//       .text()
//       .replace("Nome Empresa: ", "")
//       .trim();
//     const href = "https://olx.pt" + $(element).find("a").attr("href");
//     const job: IJob = {
//       source: "Olx",
//       name,
//       location: item.location,
//       category: item.category,
//       company: company || "Não especificado",
//       href,
//       createdAt: Timestamp.now(),
//     };
//     jobs.push(job);
//   });
// }

// async function sleep(ms: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function getJobsOlx(): Promise<IJob[]> {
//   const jobs: IJob[] = [];
//   let index = 0;

//   for (const item of list) {
//     await getOlx(jobs, item);
//     await sleep((Math.floor(Math.random() * (30 - 10 + 1)) + 10) * 1000);
//     index++;
//     console.log(`${index} of ${list.length}`);
//   }
//   return jobs;
// }

// const list = [
//   {
//     url: "https://www.olx.pt/emprego/lisboa/q-restaura%C3%A7%C3%A3o/",
//     location: "Lisboa",
//     category: "Restauração",
//   },
// {
//   url: "https://www.olx.pt/emprego/lisboa/q-restaura%C3%A7%C3%A3o/?page=2",
//   location: "Lisboa",
//   category: "Restauração",
// },
// ];
// int two() {
//   return 2;
// }

// Define uma função HTTP onRequestc
export const helloWorld = onSchedule("every 24 hours", async (event) => {
  // const olxJobs = await getJobsOlx();
  // for (const job of olxJobs) {
  //   db.collection("vacancies").doc().set(job);
  // }
});
