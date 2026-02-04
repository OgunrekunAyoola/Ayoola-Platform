
import { config } from "../config/env";

const BASE_URL = `http://localhost:${config.PORT}/api`;
const CONCURRENCY = 50; // Number of simultaneous requests
const TOTAL_REQUESTS = 1000; // Total requests to send

interface RequestResult {
  success: boolean;
  duration: number;
  status: number;
}

async function makeRequest(): Promise<RequestResult> {
  const start = performance.now();
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    const end = performance.now();
    // We don't parse JSON to save client CPU, just check status
    // await res.json(); 
    return {
      success: res.status === 200,
      duration: end - start,
      status: res.status,
    };
  } catch (err) {
    const end = performance.now();
    return {
      success: false,
      duration: end - start,
      status: 0,
    };
  }
}

async function runStressTest() {
  console.log(`Starting Stress Test on ${BASE_URL}/posts`);
  console.log(`Concurrency: ${CONCURRENCY}`);
  console.log(`Total Requests: ${TOTAL_REQUESTS}`);
  console.log("----------------------------------------");

  const startTime = performance.now();
  let completed = 0;
  let successCount = 0;
  let failCount = 0;
  const latencies: number[] = [];

  const queue = Array.from({ length: TOTAL_REQUESTS }, (_, i) => i);
  
  // Worker function
  const worker = async () => {
    while (queue.length > 0) {
      queue.pop(); // Take a job
      const result = await makeRequest();
      completed++;
      
      if (result.success) successCount++;
      else failCount++;
      
      latencies.push(result.duration);

      if (completed % 100 === 0) {
        process.stdout.write(`\rProgress: ${completed}/${TOTAL_REQUESTS}`);
      }
    }
  };

  // Start workers
  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  const endTime = performance.now();
  const totalTimeMs = endTime - startTime;
  const totalTimeSec = totalTimeMs / 1000;
  const rps = TOTAL_REQUESTS / totalTimeSec;
  
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  const p95Latency = latencies.sort((a, b) => a - b)[Math.floor(latencies.length * 0.95)];

  console.log("\n----------------------------------------");
  console.log("STRESS TEST RESULTS");
  console.log("----------------------------------------");
  console.log(`Total Time:     ${totalTimeSec.toFixed(2)} s`);
  console.log(`Throughput:     ${rps.toFixed(2)} req/sec`);
  console.log(`Success Rate:   ${((successCount / TOTAL_REQUESTS) * 100).toFixed(2)}% (${successCount}/${TOTAL_REQUESTS})`);
  console.log(`Error Rate:     ${((failCount / TOTAL_REQUESTS) * 100).toFixed(2)}% (${failCount}/${TOTAL_REQUESTS})`);
  console.log("----------------------------------------");
  console.log(`Avg Latency:    ${avgLatency.toFixed(2)} ms`);
  console.log(`Min Latency:    ${minLatency.toFixed(2)} ms`);
  console.log(`Max Latency:    ${maxLatency.toFixed(2)} ms`);
  console.log(`P95 Latency:    ${p95Latency.toFixed(2)} ms`);
  console.log("----------------------------------------");
}

runStressTest().catch(console.error);
