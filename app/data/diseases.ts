// app/data/diseases.ts
// General awareness only. No treatments or doses. Notifiable diseases must be reported to the veterinary authority.

export type Disease = {
  name: string;
  signs: string;
  prevention: string;
  notifiable?: boolean;
};

export const diseases: Record<string, Disease[]> = {
  chicken: [
    {
      name: "Newcastle disease",
      signs:
        "Sneezing, coughing, drop in egg laying, twisted neck, greenish diarrhoea, sudden deaths.",
      prevention:
        "Vaccinate on schedule, keep visitors and wild birds out, control rodents.",
      notifiable: true,
    },
    {
      name: "Infectious bronchitis",
      signs:
        "Coughing, sneezing, runny eyes and nose, lower egg production, misshapen eggs.",
      prevention:
        "Vaccinate, keep housing dry and ventilated, avoid overcrowding.",
    },
    {
      name: "Coccidiosis",
      signs:
        "Bloody or watery droppings, ruffled feathers, weight loss, reduced feed intake.",
      prevention:
        "Keep litter dry, clean regularly, avoid overcrowding, use age-appropriate feed.",
    },
    {
      name: "Gumboro (infectious bursal disease)",
      signs:
        "Depression, ruffled feathers, white watery droppings, young birds most affected.",
      prevention:
        "Vaccinate chicks on schedule, keep a strict hygiene routine.",
    },
  ],
  turkey: [
    {
      name: "Blackhead (histomoniasis)",
      signs:
        "Yellowish droppings, drooping wings, dark or swollen head, weight loss.",
      prevention:
        "Keep turkeys separate from chickens, rotate ground, clean housing.",
    },
    {
      name: "Newcastle disease",
      signs:
        "Respiratory signs, twisted neck, drop in production, sudden deaths.",
      prevention:
        "Vaccinate on schedule, restrict visitors, control wild birds.",
      notifiable: true,
    },
    {
      name: "Coccidiosis",
      signs: "Bloody droppings, weakness, poor growth, ruffled feathers.",
      prevention: "Dry litter, clean housing, avoid overcrowding.",
    },
  ],
  goat: [
    {
      name: "Internal parasites (worms)",
      signs: "Weight loss, pale gums, poor coat, diarrhoea, weakness.",
      prevention:
        "Rotate grazing, keep pens clean, check body condition regularly.",
    },
    {
      name: "Pneumonia",
      signs: "Coughing, fast breathing, nasal discharge, fever, low energy.",
      prevention:
        "Good ventilation without draughts, avoid overcrowding, isolate new animals.",
    },
    {
      name: "Foot rot",
      signs: "Limping, swelling between the toes, a foul smell from the hoof.",
      prevention: "Keep ground dry, trim hooves regularly, check feet often.",
    },
    {
      name: "Mastitis",
      signs: "Hard, hot or swollen udder, changes in milk, reduced milk yield.",
      prevention:
        "Keep bedding clean, milk hygienically, check udders regularly.",
    },
  ],
  sheep: [
    {
      name: "Internal parasites (worms)",
      signs: "Weight loss, pale gums, diarrhoea, weakness, poor wool.",
      prevention:
        "Rotate grazing, keep pens clean, monitor condition regularly.",
    },
    {
      name: "Foot rot",
      signs: "Lameness, swelling between the toes, a foul smell.",
      prevention: "Dry ground, regular foot checks, isolate lame animals.",
    },
    {
      name: "Pneumonia",
      signs: "Coughing, fast breathing, fever, nasal discharge.",
      prevention:
        "Good airflow, avoid overcrowding, keep new animals apart at first.",
    },
  ],
  swine: [
    {
      name: "Diarrhoea in piglets",
      signs: "Watery droppings, dehydration, weakness, weight loss.",
      prevention:
        "Clean farrowing pens, warmth for piglets, good hygiene at birth.",
    },
    {
      name: "Respiratory disease",
      signs: "Coughing, sneezing, laboured breathing, reduced growth.",
      prevention: "Good ventilation, avoid overcrowding, keep pens dry.",
    },
    {
      name: "Internal parasites (worms)",
      signs: "Poor growth, rough coat, pot belly, diarrhoea.",
      prevention:
        "Clean pens regularly, rotate pasture, keep feed away from droppings.",
    },
    {
      name: "African swine fever",
      signs:
        "High fever, loss of appetite, bleeding under the skin, sudden deaths.",
      prevention:
        "Strict biosecurity, no untreated swill, restrict visitors and animal movement.",
      notifiable: true,
    },
  ],
  cattle: [
    {
      name: "Mastitis",
      signs: "Hot, swollen or hard udder, changes in milk, reduced yield.",
      prevention: "Clean bedding, hygienic milking, check udders regularly.",
    },
    {
      name: "Internal parasites (worms)",
      signs: "Weight loss, poor coat, diarrhoea, reduced growth.",
      prevention: "Rotate pasture, monitor body condition, keep water clean.",
    },
    {
      name: "Bloat",
      signs: "Swollen left side of the belly, distress, reduced eating.",
      prevention: "Introduce lush pasture gradually, keep access to dry feed.",
    },
    {
      name: "Foot-and-mouth disease",
      signs:
        "Fever, blisters on the mouth, feet and teats, drooling, lameness.",
      prevention:
        "Strict movement control, quarantine new animals, report suspected cases.",
      notifiable: true,
    },
  ],
};
