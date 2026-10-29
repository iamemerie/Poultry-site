type Offer = {
  name: string;
  description: string;
  price: string;
};

type Feed = {
  name: string;
  description: string;
  stage?: string;
};

type Animal = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  blurb: string;
  offers: Offer[];
  feeds: Feed[];
};

export const animals = [
  {
    slug: "chicken",
    name: "Chickens",
    image: "/cock.jpeg",
    alt: "cock",
    blurb:
      "Chickens are domesticated birds that are widely kept for their eggs and meat. They are social animals that exhibit a range of behaviors, including pecking, scratching, and dust bathing.",
    offers: [
      {
        name: "Eggs",
        description:
          "Fresh eggs from our free-range chickens, available in various sizes and colors.",
        price: "₦7000 per dozen",
      },
      {
        name: "Meat",
        description:
          "High-quality chicken meat, available in whole or cut pieces.",
        price: "₦2500 per One(Kg)",
      },
      {
        name: "Chicks",
        description:
          "Day-old chicks for those looking to start their own flock.",
        price: "₦1500 per chick",
      },
    ],
    feeds: [
      {
        name: "Chick starter",
        stage: "Chicks",
        description:
          "A complete, high-protein feed made for the first weeks of life.",
      },
      {
        name: "Grower feed",
        stage: "Growing birds",
        description:
          "Supports steady growth before birds start laying or are sold.",
      },
      {
        name: "Layer feed",
        stage: "Laying hens",
        description:
          "Balanced for egg production, with calcium for strong shells.",
      },
      {
        name: "Clean water",
        description: "Always available, and checked and refilled every day.",
      },
    ],
  },
  {
    slug: "turkey",
    name: "Turkeys",
    image: "/tk.jpeg",
    alt: "Black turkey",
    blurb:
      "Turkeys are large birds native to North America, known for their distinctive fan-shaped tails and wattled necks. They are often raised for their meat, which is a popular choice for holiday meals.",
    offers: [
      {
        name: "Meat",
        description: "Premium turkey meat, available in whole or cut pieces.",
        price: "₦2500 per One(Kg)",
      },
      {
        name: "Eggs",
        description:
          "Fresh turkey eggs, larger than chicken eggs and rich in flavor.",
        price: "₦5999 per dozen",
      },
    ],
    feeds: [
      {
        name: "Turkey starter",
        stage: "Young turkeys",
        description:
          "A complete, high-protein feed made for the first weeks of life.",
      },
      {
        name: "Grower feed",
        stage: "Growing birds",
        description:
          "Supports steady growth before birds start laying or are sold.",
      },
      {
        name: "Layer feed",
        stage: "Laying hens",
        description:
          "Balanced for egg production, with calcium for strong shells.",
      },
      {
        name: "Clean water",
        description: "Always available, and checked and refilled every day.",
      },
    ],
  },
  {
    slug: "goat",
    name: "Goats",
    image: "/goats.jpeg",
    alt: "Goats",
    blurb:
      "Goats are versatile livestock animals that are raised for their milk, meat, and fiber. They are known for their agility and curious nature, making them a popular choice for small farms and homesteads.",
    offers: [
      {
        name: "Meat",
        description:
          "Tender and flavorful goat meat, available in various cuts.",
        price: "₦1500 per One(Kg)",
      },
      {
        name: "Buck or Doe",
        description: "Adult goats for those looking to rear their own herd.",
        price: "₦150000 per adult",
      },
      {
        name: "Kid",
        description: "Young goats for those looking to start their own herd.",
        price: "₦50000 per kid",
      },
    ],
    feeds: [
      {
        name: "Forage and browse",
        description:
          "Quality hay, grass and leaves make up most of a goat's diet.",
      },
      {
        name: "Concentrate feed",
        stage: "Kids and lactating does",
        description: "Extra energy and protein for animals with higher needs.",
      },
      {
        name: "Minerals",
        description: "A goat-specific mineral supplement, always on offer.",
      },
      {
        name: "Clean water",
        description: "Always available, and checked and refilled every day.",
      },
    ],
  },
  {
    slug: "cattle",
    name: "Cattle",
    image: "/cattle.jpeg",
    alt: "Cattle",
    blurb:
      "Cattle are large domesticated ungulates that are raised for their meat, milk, and hides. They are social animals that form strong bonds with their herd members and are known for their calm demeanor.",
    offers: [
      {
        name: "Beef",
        description: "High-quality beef, available in various cuts and grades.",
        price: "₦2500 per One(Kg)",
      },
      {
        name: "Milk",
        description: "Fresh cow's milk, available in various sizes.",
        price: "₦1000 per gallon",
      },
      {
        name: "Calves",
        description: "Young cattle for those looking to start their own herd.",
        price: "₦200000 per calf",
      },
      {
        name: "Adult Cattle",
        description: "Adult cattle for those looking to expand their herd.",
        price: "₦1,500,000 per adult",
      },
    ],
    feeds: [
      {
        name: "Pasture and hay",
        description: "Good-quality forage is the base of the diet.",
      },
      {
        name: "Supplementary feed",
        stage: "Calves and lactating cows",
        description: "Added concentrates where forage alone isn't enough.",
      },
      {
        name: "Salt and minerals",
        description: "Offered free-choice, with changes introduced gradually.",
      },
      {
        name: "Clean water",
        description: "Always available, and checked and refilled every day.",
      },
    ],
  },
  {
    slug: "swine",
    name: "Swine",
    image: "/swinne.jpg",
    alt: "Swine",
    blurb:
      "Swine, also known as pigs, are intelligent and social animals that are raised for their meat, which is a popular choice in many cuisines around the world. They are known for their rooting behavior and ability to adapt to various environments.",
    offers: [
      {
        name: "Pork",
        description:
          "High-quality pork, available in various cuts and preparations.",
        price: "₦7000 per pound",
      },
      {
        name: "Piglets",
        description: "Young pigs for those looking to raise their own herd.",
        price: "₦75000 per piglet",
      },
      {
        name: "Swine",
        description: "Adult pigs for those looking to expand their herd.",
        price: "₦250000 per adult",
      },
    ],
    feeds: [
      {
        name: "Starter feed",
        stage: "Piglets",
        description: "Easy-to-digest feed for weaning piglets.",
      },
      {
        name: "Grower and finisher",
        stage: "Growing pigs",
        description: "Balanced rations that change as the pigs grow.",
      },
      {
        name: "Breeder feed",
        stage: "Sows",
        description: "Adjusted for pregnant and nursing sows.",
      },
      {
        name: "Clean water",
        description: "Always available, and checked and refilled every day.",
      },
    ],
  },
  {
    slug: "sheep",
    name: "Sheep",
    image: "/sheep.jpeg",
    alt: "Sheep",
    blurb:
      "Sheep are domesticated ruminants that are raised for their wool, meat, and milk. They are social animals that form strong flock bonds and are known for their grazing behavior.",
    offers: [
      {
        name: "Meat",
        description:
          "Tender and flavorful lamb and mutton, available in various cuts.",
        price: "₦2500 per One(Kg)",
      },
      {
        name: "Wool",
        description: "High-quality wool for textile production.",
        price: "₦5000 per kg",
      },
      {
        name: "Lambs",
        description: "Young sheep for those looking to start their own flock.",
        price: "₦100000 per lamb",
      },
    ],
    feeds: [
      {
        name: "Pasture and hay",
        description: "Good-quality forage is the base of a sheep's diet.",
      },
      {
        name: "Concentrate feed",
        stage: "Lambs and lactating ewes",
        description: "Extra energy and protein for animals with higher needs.",
      },
      {
        name: "Mineral lick",
        description: "A sheep-specific mineral supplement, always available.",
      },
      {
        name: "Clean water",
        description: "Always available, and checked and refilled every day.",
      },
    ],
  },
];
