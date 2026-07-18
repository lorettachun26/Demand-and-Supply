import { ConceptItem, MCQQuestion, ShiftingChallenge, ShortAnswerQuestion } from "../types";

export const economicsConcepts: ConceptItem[] = [
  {
    id: "demand_qd_vs_d",
    title: "Change in Qd vs. Change in Demand",
    category: "demand",
    summary: "Understand the vital DSE difference between moving along the demand curve and shifting the entire curve.",
    definition: "The Law of Demand states that ceteris paribus, when the price of a good increases, its quantity demanded decreases, and vice versa. This is a negative relationship.",
    keyPoints: [
      "Change in Quantity Demanded (Qd) is caused SOLELY by a change in the good's own price. It is represented by a movement ALONG the existing demand curve.",
      "Change in Demand (D) is caused by non-price factors (e.g., income, tastes, related goods). It is represented by a SHIFT of the entire demand curve."
    ],
    details: [
      "If the price of a coffee cup falls from $30 to $20, more people buy it. This is an increase in quantity demanded (movement down along the curve).",
      "If scientific reports show coffee is super healthy, more people buy coffee at ALL price levels. This is an increase in demand (the entire demand curve shifts right)."
    ]
  },
  {
    id: "supply_qs_vs_s",
    title: "Change in Qs vs. Change in Supply",
    category: "supply",
    summary: "Learn how own-price adjustments differ from structural supply-side transformations.",
    definition: "The Law of Supply states that ceteris paribus, when the price of a good increases, its quantity supplied increases, and vice versa. This is a positive relationship.",
    keyPoints: [
      "Change in Quantity Supplied (Qs) is caused SOLELY by a change in the good's own price. It is represented by a movement ALONG the existing supply curve.",
      "Change in Supply (S) is caused by non-price factors (e.g., cost of production, technology, competitive supply, joint supply). It is represented by a SHIFT of the entire supply curve."
    ],
    details: [
      "If the price of smartphones rises, manufacturers are motivated to produce more from current lines. This is an increase in quantity supplied (movement up along the curve).",
      "If a new robotic technique reduces assembly costs by 50%, factories supply more smartphones at ALL prices. This is an increase in supply (the entire supply curve shifts right/down)."
    ]
  },
  {
    id: "factors_demand",
    title: "Factors Affecting Demand (Curve Shift)",
    category: "demand",
    summary: "Analyse the major DSE non-price determinants that shift the demand curve left or right.",
    definition: "Factors other than own-price that determine buyers' willingness and ability to purchase.",
    keyPoints: [
      "Income of Consumers: For Normal goods, income rise causes demand to rise (shift right). For Inferior goods (e.g., instant noodles), income rise causes demand to fall (shift left).",
      "Prices of Related Goods: Complements (used together, e.g., cars and fuel) have negative cross-effects. Substitutes (replacing each other, e.g., beef and pork) have positive cross-effects.",
      "Preferences & Tastes: Positive advertisement or trends shift demand right; negative reports shift it left.",
      "Future Expectations: If consumers expect the price to rise in the future, their demand today shifts right."
    ],
    details: [
      "Substitutes: If the price of beef rises, consumers buy less beef and switch to pork. Demand for pork increases today.",
      "Complements: If the price of cars rises, consumers buy fewer cars. Since they need less fuel, the demand for fuel decreases."
    ]
  },
  {
    id: "factors_supply",
    title: "Factors Affecting Supply (Curve Shift)",
    category: "supply",
    summary: "Discover the non-price factors that motivate suppliers to shift their entire production capabilities.",
    definition: "Variables that alter the cost of production or production feasibility at all price points.",
    keyPoints: [
      "Prices of Factors of Production (Costs): If wages, raw materials, or rents increase, production costs rise, shifting supply left (decrease).",
      "Technological Progress: Innovation increases productivity, lowering average costs and shifting supply right (increase).",
      "Joint Supply (By-products): Two goods are produced together (e.g., beef and leather hide). An increase in beef production automatically increases leather supply.",
      "Competitive Supply: Two goods compete for the same resource (e.g., residential vs. commercial building land). If residential prices surge, land is diverted there, reducing commercial building supply."
    ],
    details: [
      "Competitive Supply: A developer has 10,000 sq ft. If residential rents skyrocket, they build flats instead of offices, reducing the supply of offices (competitive supply shifts left).",
      "Joint Supply: When more cattle are slaughtered for beef, more raw hides are automatically available for leather. Supply of hides shifts right."
    ]
  },
  {
    id: "market_equilibrium",
    title: "Market Equilibrium & Simultaneous Shifts",
    category: "equilibrium",
    summary: "Examine how prices adjust to clear the market, and how double-shifts trigger indeterminate outcomes.",
    definition: "Market equilibrium occurs at the price where quantity demanded equals quantity supplied ($Q_d = Q_s$). There is no tendency for price or quantity to change.",
    keyPoints: [
      "Market Shortage (Excess Demand): If price is set BELOW equilibrium, $Q_d > Q_s$. Price faces upward pressure.",
      "Market Surplus (Excess Supply): If price is set ABOVE equilibrium, $Q_s > Q_d$. Price faces downward pressure.",
      "Double Shifts Rule: If both demand and supply shift at the same time, either the final price ($P$) or quantity ($Q$) will be indeterminate (uncertain), unless the exact magnitudes of the shifts are specified."
    ],
    details: [
      "Case: Both Demand & Supply Increase. Buyers want more, sellers offer more. Quantity ($Q$) definitely increases. Price ($P$) depends on the magnitude: if $\\Delta D > \\Delta S$, $P$ rises; if $\\Delta D < \\Delta S$, $P$ falls; if they are equal, $P$ is constant.",
      "Case: Demand Increases and Supply Decreases. Demand push and supply contraction both push Price up. Price ($P$) definitely rises, while Quantity ($Q$) is indeterminate."
    ]
  }
];

export const hongKongCases = [
  {
    id: "tunnel_congestion",
    title: "Case 1: Cross-Harbour Tunnel Congestion",
    year: "2020",
    dseRef: "DSE 2020 Paper 2 Q11(b)",
    description: "Peak-hour congestion at the Cross-Harbour Tunnel (CHT) is a classic example of fixed government pricing creating a persistent market shortage.",
    explanation: "The designed hourly capacity of the CHT is 2,600 cars. However, during peak hours, the actual demand reaches 4,400 to 4,600 cars because the toll is kept artificially low ($20 for private cars). Since the price is set far below the market-clearing equilibrium toll, quantity demanded exceeds designed capacity, creating a severe shortage (excess demand). Since price is not allowed to rise to ration the resource, physical queueing (a non-price rationing method) of 1,500m - 3,000m occurs.",
    economicConcepts: ["Price set below equilibrium", "Shortage (Excess Demand)", "Non-price rationing (Queueing cost)"],
    badgeColor: "bg-red-50 text-red-700 border-red-200"
  },
  {
    id: "tesla_tax_exemption",
    title: "Case 2: Tesla's Tax Exemption Ending",
    year: "2017",
    dseRef: "DSE 2017 Paper 1 Q20",
    description: "In February 2017, the HK government announced the full exemption from first registration tax on electric vehicles would end on March 31, 2017.",
    explanation: "This announcement dramatically shifted buyers' expectations. Knowing that buying a Tesla in April would cost nearly twice as much due to the heavy registration tax, consumers expected the future cost of buying electric vehicles to rise sharply. This triggered an enormous rightward shift in demand TODAY. Monthly registrations surged from 168 in Jan to 590 in Feb, and skyrocketed to 2,939 in March right before the exemption expired.",
    economicConcepts: ["Expected future price change", "Increase in current demand today", "Surge in quantity transacted"],
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "property_stamp_duties",
    title: "Case 3: Stamp Duties and Construction waste controls",
    year: "2012",
    dseRef: "DSE 2012 Paper 1 Q15",
    description: "The government increased stamp duties on property buyers to cool down the housing market, while simultaneously tightening construction waste controls.",
    explanation: "This represents an authentic simultaneous double-shift in the property market. 1) Increasing stamp duties on buyers decreases their demand (shifts Demand curve left from $D_0$ to $D_1$). 2) Tightening waste controls increases the production cost for builders, which decreases supply (shifts Supply curve left from $S_0$ to $S_1$). Since both demand and supply decrease, the equilibrium quantity of properties transacted must decrease ($Q \\downarrow$). The final effect on the property price ($P$) is indeterminate (uncertain) because the demand reduction pushes price down while the supply reduction pushes price up.",
    economicConcepts: ["Demand decreases (Stamp duties)", "Supply decreases (Higher production costs)", "Equilibrium quantity decreases", "Equilibrium price indeterminate"],
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "esports_subsidies",
    title: "Case 4: Government E-sports Promotion",
    year: "2019",
    dseRef: "DSE 2019 Paper 1 Q13",
    description: "The Hong Kong government promoted e-sports by subsidising equipment manufacturers and subsidising e-sports training programmes.",
    explanation: "This is a simultaneous double-shift where both curves shift rightwards. 1) Subsidising equipment manufacturers lowers their production costs, increasing supply (shifting Supply curve right). 2) Subsidising training programmes increases consumers' interest and lowers their learning cost, increasing demand (shifting Demand curve right). Since both demand and supply increase, the equilibrium quantity of e-sports equipment transacted must increase ($Q \\uparrow$). The final effect on the equipment price is indeterminate, as demand increase pushes price up while supply increase pushes price down.",
    economicConcepts: ["Supply increases (Subsidies to firms)", "Demand increases (Subsidies to consumers)", "Quantity transacted increases", "Price change indeterminate"],
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  }
];

export const shiftingChallenges: ShiftingChallenge[] = [
  {
    id: "challenge_high_speed_rail",
    scenario: "A train accident seriously affects the confidence of travellers using high-speed electric train services. At the same time, the airline industry is facing the problem of rising fuel prices. Find the new equilibrium for AIR TRAVEL SERVICES.",
    market: "Air Travel Services",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "increase",
    correctSupplyShift: "decrease",
    explanation: "1) High-speed rail and air travel are substitutes. The train accident reduces travellers' confidence in trains, causing them to switch, which increases the demand for air travel today (Demand shifts right). 2) Rising fuel prices increase the cost of production for airlines, which decreases the supply of air travel (Supply shifts left). Thus, demand increases and supply decreases, pushing the equilibrium price up significantly. Quantity is indeterminate depending on shift sizes.",
    successMessage: "Correct! You correctly identified that substitute safety issues increase demand, while higher input costs decrease supply.",
    dseReference: "DSE 2012 Paper 1 Q13"
  },
  {
    id: "challenge_tesla_tax",
    scenario: "The Hong Kong government announces that the first registration tax waiver for electric vehicles will expire in one month. Find the effect on the electric vehicle market TODAY.",
    market: "Electric Vehicles (Today)",
    initialEquilibrium: { p: 40, q: 40 },
    correctDemandShift: "increase",
    correctSupplyShift: "constant",
    explanation: "Consumers expect the cost of electric vehicles to increase dramatically next month when the tax waiver ends. Therefore, current demand increases today (Demand shifts right) while supply remains unchanged. This leads to a surge in both the equilibrium price and quantity transacted today.",
    successMessage: "Excellent! You mastered how expectations of future price hikes shift current demand right today.",
    dseReference: "DSE 2017 Paper 1 Q20"
  },
  {
    id: "challenge_cosmetic_surgery",
    scenario: "People in Hong Kong become more open-minded towards cosmetic surgery. At the same time, the government imposes strict safety regulations on the cosmetic surgery industry. Find the new equilibrium.",
    market: "Cosmetic Surgery Market",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "increase",
    correctSupplyShift: "decrease",
    explanation: "1) Open-mindedness increases consumer preferences, which increases demand (Demand shifts right). 2) Strict safety regulations increase compliance costs for clinics, which decreases supply (Supply shifts left). Price definitely rises, while quantity transacted is indeterminate.",
    successMessage: "Perfect! Increased preferences shift demand right, while regulatory costs shift supply left.",
    dseReference: "DSE 2014 Paper 1 Q14"
  },
  {
    id: "challenge_rice_epidemic",
    scenario: "Due to a sudden outbreak of a highly contagious epidemic, local citizens stock up heavily on staple foodstuffs like rice for home-cooking. Simultaneously, severe dry weather in Southeast Asian rice exporters drastically reduces rice harvests. Analyze the market for RICE today.",
    market: "Rice Market",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "increase",
    correctSupplyShift: "decrease",
    explanation: "1) Storing up staple foods for cooking at home increases the preference for rice, shifting current demand right (increase). 2) Severe dry weather destroys agricultural crops in exporter countries, decreasing supply (Supply shifts left/decrease). Price definitely rises, while quantity transacted is indeterminate.",
    successMessage: "Correct! Demand increases from pantry stocking while extreme dry weather cuts down agricultural supply.",
    dseReference: "DSE 2021 Paper 1 Q12"
  },
  {
    id: "challenge_electric_cars",
    scenario: "A major technological breakthrough makes lithium-ion batteries (a key component in electric cars) 40% cheaper to produce. At the same time, the price of gasoline (the fuel for traditional internal combustion cars) decreases significantly. Find the new equilibrium for the ELECTRIC CARS market.",
    market: "Electric Cars Market",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "decrease",
    correctSupplyShift: "increase",
    explanation: "1) Cheaper lithium-ion batteries lower the input/production costs for electric car manufacturers, increasing supply (Supply shifts right/increase). 2) Gasoline and electric cars are substitutes. A lower price of gasoline makes running gasoline cars cheaper, leading consumers to substitute away from electric cars, which decreases the demand for electric cars (Demand shifts left/decrease). Price definitely falls, while quantity transacted is indeterminate.",
    successMessage: "Fantastic! Lower input battery costs shift supply right, and cheaper substitute fuel (gasoline) shifts electric car demand left.",
    dseReference: "DSE 2018 Paper 1 Q14"
  },
  {
    id: "challenge_air_purifiers",
    scenario: "The Environmental Protection Department issues a hazardous smog health alert for multiple consecutive days. Concurrently, the government removes import tariffs on all household electronic appliances, including air purifiers. Find the new equilibrium for AIR PURIFIERS.",
    market: "Air Purifiers Market",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "increase",
    correctSupplyShift: "increase",
    explanation: "1) Smog alerts increase consumers' preference for air filtration and safety, shifting demand right (increase). 2) Removing import tariffs decreases the tax cost of importing units, increasing market supply (Supply shifts right/increase). Quantity definitely increases, while the effect on price is indeterminate.",
    successMessage: "Superb! Pollution concerns shift demand right, and the abolition of import tariffs shifts supply right.",
    dseReference: "DSE 2016 Paper 1 Q15"
  },
  {
    id: "challenge_pork_flu",
    scenario: "A swine flu outbreak hits local pig farms, leading to the culling of thousands of pigs. Meanwhile, medical experts publish reports warning that eating pork can be linked to higher cholesterol levels. Analyze the market for PORK.",
    market: "Pork Market",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "decrease",
    correctSupplyShift: "decrease",
    explanation: "1) Pig culling directly cuts down the livestock population, decreasing supply (Supply shifts left/decrease). 2) Health warnings concerning cholesterol lower consumer tastes/preferences for pork, decreasing demand (Demand shifts left/decrease). Quantity definitely decreases, while price is indeterminate.",
    successMessage: "Brilliant! Swine flu reduces livestock supply, and negative health advisory reports shift demand left.",
    dseReference: "DSE 2019 Paper 1 Q15"
  },
  {
    id: "challenge_genuine_leather",
    scenario: "A global surge in demand for steak and high-quality beef leads to a massive expansion of cattle ranching. At the same time, the development of synthetic vegan leather becomes highly popular and cheaper to produce. Find the new equilibrium for the GENUINE LEATHER market.",
    market: "Genuine Leather Market",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "decrease",
    correctSupplyShift: "increase",
    explanation: "1) Genuine leather and beef are in Joint Supply (they are produced from the same cattle). Higher steak demand drives ranch expansions, which automatically increases raw hide supply, shifting supply of leather right (increase). 2) Vegan leather is a cheap substitute; its rising popularity shifts demand for genuine leather left (decrease). Price definitely decreases, while quantity transacted is indeterminate.",
    successMessage: "Exceptional! Beef expansion increases genuine leather supply via Joint Supply, while cheap vegan substitutes shift demand left.",
    dseReference: "DSE 2015 Paper 1 Q16"
  },
  {
    id: "challenge_taxi_services",
    scenario: "A new user-friendly ride-hailing app goes viral, offering frequent ride discounts and superior convenience. Simultaneously, the government imposes a strict annual fee on traditional taxi license renewals. Find the new equilibrium for TRADITIONAL TAXI SERVICES.",
    market: "Traditional Taxi Services",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "decrease",
    correctSupplyShift: "decrease",
    explanation: "1) Ride-hailing apps are substitutes for traditional taxis. High discounts shift commuters' demand away, decreasing traditional taxi demand (Demand shifts left/decrease). 2) Licensing renewal fees increase taxi operators' production costs, decreasing supply (Supply shifts left/decrease). Quantity definitely decreases, while price is indeterminate.",
    successMessage: "Perfect! Digital substitute competitors shift taxi demand left, and government regulatory fees shift taxi supply left.",
    dseReference: "DSE 2017 Paper 1 Q15"
  },
  {
    id: "challenge_online_education",
    scenario: "High-speed 5G mobile networks become universal and extremely cheap. Simultaneously, a national lockdown forces schools to shift online, while several top-tier universities launch open-access materials. Find the new equilibrium for ONLINE TUITION SERVICES.",
    market: "Online Tuition Services",
    initialEquilibrium: { p: 50, q: 50 },
    correctDemandShift: "increase",
    correctSupplyShift: "increase",
    explanation: "1) School lockdowns and widespread remote settings shift consumers' preference and necessity towards online education, shifting demand right (increase). 2) Universal cheap 5G and open university content lower the barriers and server costs for tutors, shifting supply of tuition services right (increase). Quantity definitely increases, while price is indeterminate.",
    successMessage: "Outstanding! Work-from-home/lockdown situations shift online tuition demand right, and lower internet costs shift supply right.",
    dseReference: "DSE 2020 Paper 1 Q14"
  }
];

export const mcqQuestions: MCQQuestion[] = [
  {
    id: "mcq_1",
    year: "2013",
    questionNo: "10",
    text: "Which of the following is assumed to be constant when the market demand curve of a good is derived?\n\n(1) the income of the consumers\n(2) the price of the good\n(3) prices of related goods\n(4) preference of the consumers",
    options: {
      A: "(1) and (3) only",
      B: "(2) and (3) only",
      C: "(1), (2) and (4) only",
      D: "(1), (3) and (4) only"
    },
    answer: "D",
    explanation: "When deriving a demand curve, the ceteris paribus assumption applies. We assume all non-price factors are constant so that we can isolate the relationship between the good's own price and its quantity demanded. Therefore, income (1), related prices (3), and preferences (4) are held constant, whereas the good's own price (2) is allowed to vary."
  },
  {
    id: "mcq_2",
    year: "2016",
    questionNo: "13",
    text: "Which of the following situations would lead to an increase in the demand for private housing in Hong Kong?",
    options: {
      A: "The price of private housing decreases",
      B: "The supply of public housing increases",
      C: "People expect the mortgage interest rates to increase later",
      D: "People expect the price of private housing to increase later"
    },
    answer: "D",
    explanation: "If people expect the price of private housing to increase later, they will hurry to buy private housing now to avoid paying more in the future. This shifts the current demand curve for private housing to the right. Choice A is a change in quantity demanded (movement along the curve). Choice B decreases the demand for private housing since public housing is a substitute. Choice C shifts current demand left because higher future interest rates increase borrowing costs."
  },
  {
    id: "mcq_3",
    year: "2017",
    questionNo: "14",
    text: "Which of the following situations would most likely lead to an increase in the demand for iPhones produced by Apple Inc.?",
    options: {
      A: "A technological breakthrough in the battery industry reduces its production cost",
      B: "People expect the next model of iPhone will have more innovative features",
      C: "A model of Samsung smartphone is banned by many airlines due to battery hazards",
      D: "Apple Inc. reduces the selling price of iPhones"
    },
    answer: "C",
    explanation: "iPhones and Samsung phones are substitutes. A airline ban on Samsung phones reduces their usefulness and demand, causing consumers to switch to iPhones. Therefore, the demand for iPhones increases (Demand shifts right). Choice A increases the supply of iPhones. Choice B would cause people to defer their purchase, reducing current demand today. Choice D increases quantity demanded of iPhones (movement along the curve)."
  },
  {
    id: "mcq_4",
    year: "2017",
    questionNo: "17",
    text: "Suppose Good Y is an inferior good. When people's income rises and the production cost of Good Y increases, the equilibrium price of Good Y __________.",
    options: {
      A: "will increase",
      B: "will decrease",
      C: "will remain unchanged",
      D: "may increase or decrease (indeterminate)"
    },
    answer: "D",
    explanation: "Let's analyse the double shift: 1) Since Y is an inferior good, an increase in consumer income causes demand to decrease (shifts Demand left), which pushes price down. 2) An increase in production cost causes supply to decrease (shifts Supply left), which pushes price up. Because the demand shift pushes price down and the supply shift pushes price up, the net effect on equilibrium price is indeterminate without knowing the exact magnitude of the shifts."
  },
  {
    id: "mcq_5",
    year: "2021",
    questionNo: "13",
    text: "The demand for which of the following can be regarded as a derived demand?",
    options: {
      A: "Demand for mobile phones derived from earphones",
      B: "Demand for laptops derived from batteries",
      C: "Demand for music videos derived from singers",
      D: "Demand for game programmers derived from online games"
    },
    answer: "D",
    explanation: "Derived demand refers to the demand for a factor of production or input that occurs as a result of the demand for another consumer good. Game programmers are factors of production (labour); their demand is derived from the demand for the final output they create, which is online games. The other choices describe consumer complements."
  },
  {
    id: "mcq_6",
    year: "2023",
    questionNo: "11",
    text: "When Good X and Good Y are in competitive supply, a decrease in the price of Good X will lead to:",
    options: {
      A: "A decrease in the price of Good Y",
      B: "An increase in the supply of Good Y",
      C: "A decrease in the demand for Good Y",
      D: "An increase in the quantity demanded of Good Y"
    },
    answer: "B",
    explanation: "Competitive supply means both goods compete for the same production inputs (e.g. land or factory space). If the price of Good X falls, producing Good X becomes less profitable. Producers will shift their resources away from producing X and into producing Good Y. This causes an increase in the supply of Good Y (S shifts right)."
  },
  {
    id: "mcq_7",
    year: "2025",
    questionNo: "13",
    text: "The supply curve of Good X is vertical (perfectly inelastic) and its demand curve is downward-sloping. Suppose the supply of Good X decreases while the demand for Good X increases. As a result, the equilibrium price of Good X __________ and its equilibrium quantity __________.",
    options: {
      A: "will increase ... will decrease",
      B: "will increase ... is indeterminate",
      C: "will decrease ... will decrease",
      D: "will decrease ... is indeterminate"
    },
    answer: "A",
    explanation: "Since the supply curve is vertical, a decrease in supply shifts this vertical line to the left, which directly decreases the equilibrium quantity transacted ($Q \\downarrow$). At the same time, an increase in demand shifts the demand curve to the right. Both the supply reduction and the demand expansion put upward pressure on the price, meaning price definitely increases ($P \\uparrow$). Therefore, price increases and quantity decreases."
  },
  {
    id: "mcq_8",
    year: "2022",
    questionNo: "17",
    text: "If the price of flour increases, the supply of bread will decrease. This is because flour and bread are in:",
    options: {
      A: "Joint supply",
      B: "Competitive supply",
      C: "Input-output relationship (flour is a production factor for bread)",
      D: "Joint demand"
    },
    answer: "C",
    explanation: "Flour is a key factor of production (input) used to make bread. When the price of flour increases, the cost of producing bread rises, which reduces the profitability of making bread. This shifts the entire supply curve of bread to the left (decrease in supply)."
  }
];

export const shortAnswerQuestions: ShortAnswerQuestion[] = [
  {
    id: "sa_1",
    dseReference: "DSE 2012 Paper 2 Q12(c)(i) [5 Marks]",
    scenarioText: "The Hong Kong government decided to re-introduce the Home Ownership Scheme (HOS) under which eligible middle-income citizens can purchase residential flats at a great discount from the government.",
    questionText: "With the aid of a demand-supply diagram, explain how the re-introduction of the HOS would affect the private residential housing market in Hong Kong.",
    maxMarks: 5,
    modelAnswerKeywords: [
      "substitutes",
      "demand decreases",
      "demand curve shifts left",
      "equilibrium price decreases",
      "equilibrium quantity decreases"
    ],
    initialValue: "HOS flats and private housing are substitutes. When the government provides HOS flats at a discount, some buyers who would have bought private flats will switch to buy HOS flats. As a result, the demand for private housing decreases, and the demand curve of private housing shifts left. This causes both the equilibrium price and quantity of private housing to decrease."
  },
  {
    id: "sa_2",
    dseReference: "DSE 2014 Paper 2 Q10(e) [4 Marks]",
    scenarioText: "Due to the birth rate decline and ageing population, the Chinese government announced it is considering relaxing the 'one-child policy' to allow more couples to have two children.",
    questionText: "Without using a diagram, explain why the stock price of Goodbaby International (a major manufacturer of strollers and baby products) increased immediately after this policy announcement.",
    maxMarks: 4,
    modelAnswerKeywords: [
      "expected future price",
      "expected future demand",
      "demand today increases",
      "stock price",
      "profitable"
    ],
    initialValue: "When the government relaxes the policy, consumers expect more babies will be born in the future. This increases the expected future demand and profitability for baby products of Goodbaby International. Investors anticipate higher future profits, so the demand for the company's shares increases today. This shifts the demand curve for the stock to the right, causing the stock price of Goodbaby International to increase today."
  }
];
