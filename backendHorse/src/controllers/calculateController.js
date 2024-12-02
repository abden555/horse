const CalculateTime = require("../models/Schema");

function convertTimeToSeconds(timeString) {
  if (!timeString || typeof timeString !== "string") {
    throw new Error("Time string is empty or invalid");
  }
  const [minutes, seconds] = timeString.split(":");
  return parseInt(minutes) * 60 + parseFloat(seconds);
}

function secondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toFixed(2).padStart(5, "0")}`;
}

async function calculateTime(distance, horseWeights) {
  try {
    if (typeof distance !== "number" || isNaN(distance)) {
      throw new Error("Invalid distance value. Expected a number.");
    }

    const dataSets = await CalculateTime.find()
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("dataSets:", dataSets);

    let totalSeconds = 0;

    for (const dataSet of dataSets) {
      const previousDistance = dataSet.distance;
      const previousTime = dataSet.time;
      if (previousTime && typeof previousTime === "string") {
        const previousTimeInSeconds = convertTimeToSeconds(previousTime);
        const previousHorseWeight = dataSet.horseWeights;

        const horseWeightFactor = horseWeights / previousHorseWeight;

        const adjustedDistance =
          previousDistance * Math.sqrt(horseWeightFactor);

        const averageSpeed = adjustedDistance / previousTimeInSeconds;

        const estimatedTime = distance / averageSpeed;

        totalSeconds += estimatedTime;
      }
    }

    const time = secondsToTime(totalSeconds);

    const data = new CalculateTime({
      distance: distance,
      horseWeights: horseWeights,
      time: time,
    });

    const savedData = await data.save();
    console.log("Data saved successfully:", savedData);

    return time;
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
}

module.exports = { calculateTime };
