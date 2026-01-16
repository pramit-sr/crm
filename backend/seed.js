require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Lead = require("./models/Lead");

mongoose.connect(process.env.MONGO_URI);

async function seed() {
  await Lead.deleteMany({});
  const leads = [];

  for (let i = 0; i < 1000; i++) {
    leads.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("9#########"),
      status: faker.helpers.arrayElement(["New", "Contacted", "Converted"]),
      source: faker.helpers.arrayElement(["Website", "Referral", "Ads"]),
      createdAt: faker.date.past(),
    });
  }

  await Lead.insertMany(leads);
  console.log("1000 leads seeded");
  process.exit();
}

seed();
