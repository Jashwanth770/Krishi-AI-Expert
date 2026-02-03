
# Static Knowledge Base for Offline/Scratch Mode
# Covers: Farming, Milling, Markets

SCRATCH_DB = {
    # ---------------- FARMING (CULTIVATION) ----------------
    "soil": "**Soil Preparation (Standard Guide):**\n1. plough the field 2-3 times to achieve fine tilth.\n2. Level the land to ensure even water distribution.\n3. Apply Farm Yard Manure (FYM) @ 10-12 tons per hectare.\n4. Test soil pH (Ideal: 5.5 - 7.0).",
    "seed": "**Seed Selection & Treatment:**\n1. Choose high-yield varieties (e.g., MTU 1010, BPT 5204) suited to your region.\n2. Treat seeds with Carbendazim (2g/kg) to prevent fungal diseases.\n3. Soak seeds for 24 hours and incubate for 24-36 hours before sowing.",
    "nursery": "**Nursery Management:**\n1. Prepare raised beds (1m wide) for good drainage.\n2. Sow 25-30 kg seeds per hectare.\n3. Apply DAP (2kg) and Potash (1kg) per 100 sq.m.\n4. Transplant seedlings at 21-25 days age.",
    "fertilizer": "**Fertilizer Schedule (NPK):**\n• **Basal:** 50% N, 100% P, 50% K before transplanting.\n• **Tillering:** 25% N at 20-30 days.\n• **Panicle Initiation:** 25% N + remaining K at 45-50 days.\n*Note: Use Neem-Coated Urea for better efficiency.*",
    "urea": "**Urea Application:**\nApply in splits (Basal, Active Tillering, Panicle Initiation). Avoid excess Urea to prevent pest attacks like Leaf Folder.",
    "water": "**Irrigation Management:**\n• **Transplanting:** Maintain 2-3 cm water.\n• **Tillering:** Maintain 2-5 cm water.\n• **Critical Stage:** Ensure water during flowering and grain filling.\n• **Harvest:** Drain field 10 days before harvest.",
    "pest": "**Pest Control:**\n• **Stem Borer:** Dead hearts? Spray Chlorantraniliprole.\n• **Leaf Folder:** Folded leaves? Spray Monocrotophos.\n• **BPH (Hoppers):** Spray Imidacloprid.\n*Tip: Install light traps to monitor pests.*",
    "disease": "**Disease Control:**\n• **Blast:** Diamond spots? Spray Tricyclazole.\n• **Sheath Blight:** Snake skin pattern? Spray Hexaconazole.\n• **Bacterial Blight:** Drying leaf tips? Reduce Urea, drain water.",
    "harvest": "**Harvesting Guide:**\n1. Harvest when 80-85% grains turn golden yellow.\n2. Grain moisture should be 20-25%.\n3. Dry paddy immediately to reach 14% moisture for storage.",

    # ---------------- PROBLEMS & SOLUTIONS (TROUBLESHOOTING) ----------------
    "yellow": "**Problem: Yellowing of Leaves (Chlorosis)**\n• **Cause 1:** Nitrogen deficiency (Overall pale green).\n  -> *Solution:* Apply Urea.\n• **Cause 2:** Zinc deficiency (Rusty brown spots).\n  -> *Solution:* Spray Zinc Sulphate (5g/liter).\n• **Cause 3:** Iron deficiency (New leaves yellow).\n  -> *Solution:* Spray Ferrous Sulphate.",
    "wilt": "**Problem: Plant Wilting (Drooping)**\n• **Cause 1:** Water Stress (Dry soil).\n  -> *Solution:* Irrigate immediately.\n• **Cause 2:** Fusarium Wilt (Fungus blocks roots).\n  -> *Solution:* Drench soil with Copper Oxychloride or Trichoderma.\n• **Cause 3:** Bacterial Wilt.\n  -> *Solution:* Remove infected plants, use bleaching powder.",
    "drop": "**Problem: Flower/Fruit Drop**\n• **Cause:** High temp or Hormone imbalance.\n• **Solution:** Spray Planofix (NAA) @ 4ml/15 liters water. Ensure proper moisture during flowering.",
    "non germ": "**Problem: Seeds Not Germinating**\n• **Cause:** Deep sowing, ants, or rot.\n• **Solution:** Treat seeds with chemicals before sowing. Maintain proper depth (2-3 cm).",
    "white fly": "**Pest: Whitefly (Sucking Pest)**\n• **Damage:** Leaves turn sticky/black (Sooty mold). Transmits viruses.\n• **Solution:** Yellow Sticky Traps + Spray Imidacloprid or Neem Oil.",
    "borer": "**Pest: Stem Borer / Fruit Borer**\n• **Damage:** Holes in stems/fruits. Dead hearts.\n• **Solution:** Install Pheromone Traps. Spray Chlorantraniliprole (Coragen).",
    "mite": "**Pest: Mites**\n• **Damage:** Leaves curl downward (inverted boat shape).\n• **Solution:** Spray Sulphur or Dicofol.",
    "rat": "**Problem: Rat/Rodent Damage**\n• **Solution:** Use Zinc Phosphide bait (poison) or Trap crops. Keep bunds clean.",
    "saline": "**Problem: Solt/Saline Soil**\n• **Solution:** Apply Gypsum. Grow salt-tolerant varieties like CSR-36. Improve drainage.",
    
    # ---------------- MILL SPECIFIC ISSUES ----------------
    "breakage high": "**Problem: High Broken Rice %**\n• **Cause 1:** Paddy dried too fast (Sun cracks).\n• **Cause 2:** Rubber rollers worn out.\n• **Solution:** Check dryer temp (<110°C air). Adjust roller gap. Check Whitener stones.",
    "chalky": "**Problem: Chalky / Opaque Grains**\n• **Cause:** Harvested too early (Immature grains).\n• **Solution:** Harvest only at full maturity. Use Sortex to remove chalky grains.",
    "stones": "**Problem: Stones in Rice**\n• **Solution:** Check Destoner deck angle and air suction. Ensure pre-cleaner sieves are not torn.",

    # ---------------- MAJOR INDIAN CROPS ----------------
    "wheat": "**Wheat Cultivation:**\n• **Season:** Rabi (Sow in Nov/Dec).\n• **Seed Demand:** 100-125 kg/hectare.\n• **Water:** Needs 4-6 irrigations (Critical: Crown Root Initiation at 21 days).\n• **Yield:** 4-6 tons/hectare.\n• ** Varieties:** HD-2967, PBW-343.",
    "cotton": "**Cotton Farming:**\n• **Soil:** Black cotton soil is best.\n• **Sowing:** May-June (Irrigated), June-July (Rainfed).\n• **Pests:** Watch out for Pink Bollworm (Use Pheromone traps).\n• **Picking:** Pick boll opening in cool morning hours.",
    "sugarcane": "**Sugarcane Guide:**\n• **Planting:** Feb-March (Spring) or Oct (Autumn).\n• **Seed:** Use 3-budded setts.\n• **Water:** High requirement (drip irrigation recommended).\n• **Fertilizer:** Needs high Nitrogen and Potassium.",
    "maize": "**Maize (Corn) Growing:**\n• **Season:** Kharif, Rabi, and Zaid.\n• **Spacing:** 60cm x 20cm.\n• **Pest:** Fall Armyworm (FAW) is a major threat. Spray Emamectin Benzoate if needed.",
    "tomato": "**Tomato Cultivation:**\n• **Staking:** Support plants with sticks to prevent fruit rot.\n• **Disease:** Early Blight (Dark spots). Spray Mancozeb.\n• **Market:** Prices fluctuate wildly; target off-season production for profit.",
    "onion": "**Onion Farming:**\n• **Nursery:** Raise seedlings for 6-8 weeks.\n• **Transplant:** ridges and furrows.\n• **Harvest:** When 50% of tops fall over (neck fall).\n• **Curing:** Dry in shade for 2 weeks to increase shelf life.",
    "chilli": "**Chilli / Mirchi:**\n• **Leaf Curl:** Caused by Thrips/Mites. Use Yellow/Blue sticky traps.\n• **Irrigation:** Avoid water stagnation (causes wilt).\n• **Red Chilli:** Dry thoroughly on tarpaulins.",
    "turmeric": "**Turmeric Cultivation:**\n• **Time:** May-June.\n• **Rhizomes:** Treat with Trichoderma before planting.\n• **Harvest:** 7-9 months duration. Boil rhizomes before drying to get yellow color.",

    # ---------------- PULSES (DAL) ----------------
    "chana": "**Chickpea (Chana/Gram):**\n• **Season:** Rabi (Oct-Nov).\n• **Soil:** Well-drained loam. Avoid waterlogging.\n• **Pest:** Pod Borer (Helicoverpa). Spray Quinalphos at flowering.\n• **Yield:** 1.5 - 2 tons/hectare.",
    "tur": "**Red Gram (Tur/Arhar):**\n• **Duration:** Long duration crop (160-180 days).\n• **Intercropping:** Best grown with Soybean or Cotton.\n• **Disease:** Wilt (Fusarium). Use wilt-resistant varieties like Asha or Maruthi.",
    "moong": "**Green Gram (Moong/Mung Bean):**\n• **Season:** Kharif / Summer (Short duration 60-70 days).\n• **Benefit:** Fixes nitrogen in soil. Good catch crop after wheat/rice.\n• **Harvest:** Pick pods when they turn black.",
    "urad": "**Black Gram (Urad):**\n• **Season:** Kharif/Rabi.\n• **Disease:** Yellow Mosaic Virus (YMV). Vector is Whitefly. Spray Imidacloprid to control vector.",

    # ---------------- OILSEEDS ----------------
    "groundnut": "**Groundnut (Peanut):**\n• **Soil:** Sandy loam is best for peg penetration.\n• **Critical:** Apply Gypsum (500kg/ha) at flowering for pod filling.\n• **Pest:** Tikka disease (Leaf spot). Spray Mancozeb.",
    "mustard": "**Mustard/Rapeseed (Sarson):**\n• **Season:** Rabi (Cool temp needed).\n• **Pest:** Aphids (Chepa). Spray Dimethoate if infestation >20%.\n• **Harvest:** When siliquae (pods) turn yellow.",
    "soybean": "**Soybean Farming:**\n• **Sowing:** June-July.\n• **Seed Rate:** 70-75 kg/ha. Treat with Rhizobium culture.\n• **Weed:** Use Imazethapyr herbicide within 20 days.\n• **Yield:** 2.5 tons/hectare.",
    "sunflower": "**Sunflower:**\n• **Pollination:** Honey bees are essential. Keep bee colonies for 20% extra yield.\n• **Head Rot:** Avoid overhead irrigation during flowering.",

    # ---------------- MILLETS (SHREE ANNA) ----------------
    "jowar": "**Sorghum (Jowar):**\n• **Type:** Drought tolerant.\n• **Pest:** Shoot borer. Apply Furadan granules in whorls.\n• **Fodder:** Excellent cattle feed after harvest.",
    "bajra": "**Pearl Millet (Bajra):**\n• **Soil:** Can grow in poor sandy soil (Rajasthan/Gujarat).\n• **Harvest:** Earheads are harvested first, then stalks.",
    "ragi": "**Finger Millet (Ragi):**\n• **Nutrition:** High Calcium. Staple in Karnataka/TN.\n• **Process:** Transplanting gives better yield than broadcasting.",

    # ---------------- VEGETABLES & SPICES ----------------
    "potato": "**Potato Farming:**\n• **Seed:** Use virus-free seed tubers.\n• **Earthing Up:** Cover tubers with soil to prevent greening (Solanine).\n• **Disease:** Late Blight (Irish famine disease). Spray Ridomil.",
    "ginger": "**Ginger Cultivation:**\n• **Shade:** Loves partial shade. Good intercrop in orchards.\n• **Rot:** Rhizome rot is major killer. Ensure drainage.\n• **Harvest:** 8-9 months. Dry leaves indicate maturity.",
    "garlic": "**Garlic Farming:**\n• **Soil:** Rich loamy soil.\n• **Clove:** Plant big cloves for big bulbs.\n• **Harvest:** When 50% tops turn yellow.",
    "cumin": "**Cumin (Jeera):**\n• **Climate:** Needs dry, cool weather. Rain at flowering destroys crop (Blight).\n• **Region:** Rajasthan/Gujarat dominant.",
    "ladyfinger": "**Okra (Bhindi):**\n• **Pest:** Fruit Borer & Yellow Vein Mosaic (YVMV).\n• **Harvest:** Pick tender fruits every alternate day.",
    "brinjal": "**Brinjal (Eggplant):**\n• **Pest:** Shoot & Fruit Borer is biggest enemy. Use Leucinodes traps.\n• **Varieties:** Bt-Brinjal (Check local legality).",

    # ---------------- FRUITS ----------------
    "mango": "**Mango Orchard:**\n• **Planting:** 10m x 10m spacing.\n• **Pruning:** Remove dead wood / criss-cross branches.\n• **Pest:** Mango Hopper / Mealy Bug. Spray Imidacloprid before flowering.",
    "banana": "**Banana Cultivation:**\n• **Variety:** Grand Naine (G9) is popular tissue culture.\n• **Fertigation:** Heavy feeder. Needs Potash for fruit weight.\n• **Prop:** Use bamboo poles to support heavy bunches.",
    "pomegranate": "**Pomegranate (Anar):**\n• **Pruning:** Train stems (3-4 main stems).\n• **Disease:** Bacterial Blight (Oily Spot). Disinfect tools with Bleaching powder.",

    # ---------------- GOVERNMENT SCHEMES & SUBSIDIES ----------------
    "pm kisan": "**PM-KISAN Samman Nidhi:**\n• **Benefit:** ₹6,000 per year given in 3 installments of ₹2,000.\n• **Eligibility:** All landholding farmer families.\n• **Apply:** Visit pmkisan.gov.in or local CSC center.",
    "kcc": "**Kisan Credit Card (KCC):**\n• **Purpose:** Short-term loans for crops at low interest (4% with timely repayment).\n• **Limit:** Based on land size and scale of finance.\n• **Documents:** Land record, Aadhaar, Pan Card.",
    "pmfby": "**Pradhan Mantri Fasal Bima Yojana (Crop Insurance):**\n• **Premium:** 2% (Kharif), 1.5% (Rabi), 5% (Cash Crops).\n• **Coverage:** Drought, Flood, Cyclones, Pest attack.\n• **Claim:** Report loss within 72 hours to bank/agriculture officer.",
    "health card": "**Soil Health Card (SHC):**\n• **Test:** Checks pH, EC, Organic Carbon, N, P, K, S, Zinc, Iron, etc.\n• **Benefit:** Tells you exactly which fertilizer to use, saving cost.\n• **Get it:** Submit soil sample to local Agriculture Dept lab.",
    "subsidy": "**Farm Machinery Subsidy (SMAM):**\n• **Equipment:** Tractors, Rotavators, Drones, Balers.\n• **Subsidy:** 40% to 80% depending on machinery and state.\n• **Apply:** DBT Agriculture portal of your state.",
    "drone": "**Kisan Drone Scheme:**\n• Government promotes drones for nano-urea spraying.\n• Subsidy up to 75% for Farmer Producer Organizations (FPOs).",

    # ---------------- MODERN FARMING PRACTICES ----------------
    "organic": "**Organic Farming Basics:**\n1. **Stop Chemicals:** No Urea/DAP/Pesticides.\n2. **Inputs:** Use Jeevamrut, Panchagavya, Vermicompost.\n3. **Certification:** Apply for PGS-India or NPOP certification for premium prices.",
    "drip": "**Drip Irrigation:**\n• **Savings:** Saves 40-60% water.\n• **Fertigation:** Apply liquid fertilizer through drip (very efficient).\n• **Subsidy:** Usually 50-80% subsidy available via PMKSY.",
    "hydroponic": "**Hydroponics (Soilless Farming):**\nGrowing plants in nutrient water.\n• **Best for:** Lettuce, Leafy greens, Strawberries.\n• **Cost:** High setup cost, but high yield in small space.",
    "polyhouse": "**Polyhouse / Greenhouse:**\n• **Control:** Temp, humidity, light.\n• **Crops:** Colored Capsicum, Cucumber, Gerbera flowers.\n• **Profit:** High export potential.",

    # ---------------- RICE MILL (PROCESSING) ----------------
    "moisture": "**Paddy Moisture Control:**\n• **Procurement:** Max 17%.\n• **Milling:** Target 14% for best Head Rice Yield (HRY).\n• **Storage:** <13% to prevent fungi/discoloration.\n*Use a Digital Moisture Meter for accuracy.*",
    "cleaning": "**Pre-Cleaning Process:**\nRemove chaff, stones, and dust using Destoners and Pre-cleaners. Impurities damage rubber rollers and lower bran quality.",
    "dehusking": "**De-Husking / Shelling:**\n• Use pneumatic rubber roll shellers.\n• Adjust pressure to minimize broken rice.\n• Target: remove 100% husk with minimal grain damage.",
    "polish": "**Whitening & Polishing:**\n• **Abrasive Whiteners:** Remove the bran layer.\n• **Mist Polishers (Silky):** Use water mist + friction for a glossy finish.\n• **Tip:** High polish = lower nutrient content but higher market price.",
    "broken": "**Reducing Broken Rice:**\n• Ensure paddy is dried uniformy (no sun cracking).\n• Check rubber roller hardness.\n• Don't over-polish in a single pass (use multipass whitening).",
    "sortex": "**Color Sorting (Sortex):**\nUse optical sorters to remove Discolored grains (Yellow/Black) and Chalky grains. This upgrades 'Average' rice to 'Premium' quality.",
    "storage": "**Silo Storage:**\n• Aeration is key.\n• Maintain <25°C to prevent insects.\n• Fumigate with Phosphine if infestation occurs (Safety First!).",
    "transport": "**Logistics & Unloading:**\n• Use telescope conveyors for truck unloading.\n• Automate bagging to save labor.\n• Stack bags on pallets (not floor) to prevent moisture seepage.",

    # ---------------- ADVANCED RICE MILL KNOWLEDGE ----------------
    "parboil": "**Parboiling Process:**\n1. **Soaking:** Soak paddy in hot water (60-70°C) for 3-4 hours.\n2. **Steaming:** Steam at low pressure to gelatinize starch (hardens grain).\n3. **Drying:** Reduce moisture from 30% -> 14% slowly to prevent cracks.\n*Benefit: Increases Head Rice Yield (HRY) and nutritional value.*",
    "dryer": "**Paddy Drying:**\n• **LSU Dryers:** Continuous flow is best.\n• **Temp:** Keep air temp <110°C. Grain temp <45°C.\n• **Tempering:** Allow grain to rest (temper) between passes to release inner moisture.",
    "hry": "**Head Rice Yield (HRY):**\nHRY is the % of whole grains after milling.\n• **Calculation:** (Weight of Whole Rice / Total Paddy Weight) x 100.\n• **Good Target:** 60-65% for Raw, 68-72% for Parboiled.\n• **Low HRY?** Check moisture content and rubber roller clearance.",
    "yield": "**Milling Yield Standards:**\n• **Husk:** 20-22%\n• **Bran:** 8-10%\n• **Head Rice:** 50-60%\n• **Brokens:** 15-20% (Optimize to reduce this!)",
    "rollers": "**Rubber Rollers:**\n• **Life:** Change every 150-200 hours.\n• **Gap:** Maintain uniform gap.\n• **Cooling:** Ensure air circulation to prevent roller burning.",
    "destoner": "**Destoner Operation:**\nSeparates stones based on density/gravity. If rice is going into stone outlet, reduce air suction. If stones are going into rice, increase deck vibration.",
    "whitener": "**Rice Whitener:**\nRemoves the brown bran layer. Use abrasive stones (Emery). Do not exert high pressure; it causes broken rice. Multi-pass (2-3 whiteners) is better than single pass.",
    "elevator": "**Bucket Elevators:**\nCheck bucket belt tension weekly. Loose belts cause slip and jamming. Clean the boot (bottom) daily to prevent bacterial growth in old paddy.",
    "crm": "**CMR (Custom Milled Rice):**\nMilling government paddy (FCI/State) for a fixed charge. \n• **Out Turn Ratio (OTR):** Usually 67% (Raw) / 68% (Parboiled).\n• **Deadline:** Deliver rice within stipulated time to avoid penalties.",
    "fci": "**FCI Standards (FAQ - Fair Average Quality):**\n• **Moisture:** Max 14%.\n• **Foreign Matter:** Max 0.5%.\n• **Broken:** Max 25% (Raw).\n• **Damaged/Discolored:** Max 2-3%.",
    "gst": "**GST on Rice:**\n• **Unbranded (Loose):** 0% GST.\n• **Branded (Registered Brand):** 5% GST.\n• **Note:** Check latest notification as government rules change frequently.",
    "bran": "**Rice Bran Value:**\nSell bran immediately (within 24 hours) to Solvent Extraction Plants for Oil. High Free Fatty Acid (FFA) reduces price.",
    "husk": "**Husk Utility:**\n1. Boiler Fuel (Steam generation).\n2. Brick Kilns.\n3. Poultry Bedding.\n4. Ash used in cement/steel industry.",
    "discolor": "**Discoloration Causes:**\n1. Stacking wet paddy (Heat build-up).\n2. Fungal infection (Aspergillus).\n3. Delayed drying after harvest.\n*Solution: Sortex is the only way to remove it later.*",
    "maintenance": "**Preventive Maintenance:**\n• **Daily:** Blow dust from motors, check bearing temp.\n• **Weekly:** Grease bearings, check V-belts tightness, clean elevator boots.\n• **Monthly:** Check screens/sieves for holes.",
    "safety": "**Mill Safety:**\n1. **Dust:** Install cyclones/bag filters (explosive dust hazard).\n2. **Electrical:** ELCB for all lines.\n3. **Guards:** Cover all belts/pulleys.\n4. **Fire:** Keep extinguishers near the Bran godown.",
    "trouble": "**Troubleshooting:**\n• **Rice too hot?** Low aspiration air.\n• **Rice whitish/powdery?** Screen mesh worn out.\n• **Vibration?** Unbalanced blower fan.",
    "upgrade": "**Rice Mill Machinery Upgrade Guide:**\n1. **Color Sorter:** Install 4-Chute or 6-Chute Sortex (Buhler/Satake/Milltec) to remove black/yellow grains.\n2. **Whitener:** Upgrade to Silk Mist Polisher for export-quality gloss.\n3. **Dehusker:** Use Pneumatic Rubber Shellers (Auto-pressure adjustment).\n4. **Packing:** Auto-weighing and bagging machine prevents loss.",

    # ---------------- MARKET & BUSINESS ----------------
    "price": "**Market Insights:**\n• **Paddy:** ₹2,100 - ₹2,500/Quintal (Depends on quality).\n• **Rice (Retail):** ₹45 - ₹80/kg.\n• **Trends:** Check the 'Live Trends' tab for real-time Mandi rates.",
    "export": "**Export Strategy:**\n• **Basmati:** High demand in Middle East/EU. Requires PUSA certification.\n• **Non-Basmati:** Africa is a major buyer for Broken/Parboiled rice.\n• **Documents:** IEC Code, APEDA Registration, Phyto-sanitary certificate.",
    "branding": "**Mill Branding:**\n1. Create 5kg/10kg Consumer Packs.\n2. Use distinctive names (e.g., 'Royal Pearl').\n3. Sell B2C on Amazon/Flipkart to bypass wholesalers.",
}

# Synonyms for better matching
KEYWORD_MAP = {
    "grow": "soil", "planting": "soil", "sow": "soil", "prepare land": "soil",
    "seeds": "seed", "variety": "seed", "selection": "seed",
    "transplant": "nursery", "seedlings": "nursery",
    "npk": "fertilizer", "nutrient": "fertilizer", "food": "fertilizer",
    "irrigation": "water", "watering": "water", "drain": "water",
    "insect": "pest", "worm": "pest", "attack": "pest", "bug": "pest",
    "fungus": "disease", "spots": "disease", "blight": "disease",
    "cut": "harvest", "reap": "harvest", "maturity": "harvest",
    "dry": "moisture", "wet": "moisture", "humid": "moisture",
    "stone": "cleaning", "dust": "cleaning",
    "husk": "dehusking", "sheller": "dehusking", "rubber": "dehusking",
    "shine": "polish", "white": "polish", "silky": "polish", "whitening": "polish",
    "breakage": "broken", "brokens": "broken", "loss": "broken",
    "color": "sortex", "black": "sortex", "yellow": "sortex", "grading": "sortex",
    "silo": "storage", "warehouse": "storage", "stack": "storage",
    "lorry": "transport", "truck": "transport", "load": "transport", "labor": "transport",
    "rate": "price", "cost": "price", "mandi": "price",
    "foreign": "export", "ship": "export", "global": "export",
    "sell": "branding", "marketing": "branding", "profit": "branding",
    "machine": "upgrade", "machinary": "upgrade", "setup": "upgrade", "plant": "upgrade", "tech": "upgrade"
}

# ---------------- GENERAL CONVERSATION (Chatty Mode) ----------------
GENERAL_CHAT = {
    "hi": "Hello! 👋 I am Krishi AI. How can I help you with your farm or mill today?",
    "hello": "Namaste! 🙏 ready to assist you.",
    "how are you": "I am an AI, so I don't have feelings, but I am functioning at 100% efficiency! 🚀 How are you?",
    "who are you": "I am **Krishi AI**, a specialized assistant built to help Farmers and Rice Mill owners optimize their work.",
    "what can you do": "I can help you with:\n1. **Farming**: Crop advice, pest control, fertilizers.\n2. **Milling**: Processing, machines, quality checks.\n3. **Business**: Market prices, export rules.",
    "commands": "Try asking:\n• 'How to grow rice'\n• 'How to polish rice'\n• 'Wheat price'\n• 'Export Basmati'",
    "thanks": "You're welcome! Happy Farming! 🌾",
    "thank you": "Glad I could help! Let me know if you need anything else. 😊",
    "bye": "Goodbye! See you soon. 👋",
    "weather": "I can track weather if you check the dashboard! For now, please plan irrigation based on your local forecast.",
}

# Synonyms for General Chat
GENERAL_MAP = {
    "hey": "hi", "namaste": "hello", "greetings": "hello",
    "fine": "how are you", "doing": "how are you",
    "name": "who are you", "yourself": "who are you",
    "features": "what can you do", "help": "what can you do", "capabilities": "what can you do",
    "guide": "commands", "examples": "commands",
    "thx": "thanks", "good": "thanks",
}

def get_scratch_response(message):
    """
    Scans the message for keywords and returns a matched response from the DB.
    Prioritizes Domain Knowledge -> Then General Chat.
    """
    msg_lower = message.lower()
    
    # 1. Domain Knowledge (High Priority)
    for key in SCRATCH_DB:
        if key in msg_lower:
            return SCRATCH_DB[key]
            
    # 2. Domain Synonyms
    for synonym, key in KEYWORD_MAP.items():
        if synonym in msg_lower:
            return SCRATCH_DB[key]

    # 3. General Conversation (Chat Mode)
    for key in GENERAL_CHAT:
        if key in msg_lower:
            return GENERAL_CHAT[key]

    # 4. General Synonyms
    for synonym, key in GENERAL_MAP.items():
        if synonym in msg_lower:
            return GENERAL_CHAT[key]
            
    # 5. Smart 'Generative-Style' Fallback (The 'ChatGPT-like' simple response)
    if len(message.split()) > 2:
        return f"That is an interesting question about '{message}'.\n\nAs a specialized Agri-AI, I recommend consulting a local expert for specific details on this. However, if you have questions about **Rice, Wheat, Soil, or Milling Machinery**, I can give you an instant expert answer! 🌾"
            
    return None
