/**
 * Wedding Information Data
 * Eng Marady & Kao Hemsocheata
 */

export interface CeremonyItem {
  id: string;
  timeKm: string;
  timeEn: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  iconType: "fruit" | "ring" | "chant" | "knot" | "lunch" | "banquet";
}

export interface LoveStoryItem {
  year: string;
  titleKm: string;
  titleEn: string;
  descKm: string;
  descEn: string;
  tone: "day" | "golden" | "dusk" | "evening";
}

export const WEDDING_DATA = {
  couple: {
    groom: {
      nameKm: "អេង ម៉ារ៉ាឌី",
      nameEn: "Eng Marady",
      shortNameKm: "ម៉ារ៉ាឌី",
      shortNameEn: "Marady",
      titleKm: "កូនកំលោះ",
      titleEn: "Groom",
      fatherKm: "លោក គឹម ចាន់ធូ",
      fatherEn: "Mr. Kim Chanthou",
      motherKm: "លោកស្រី សុម៉ាលី",
      motherEn: "Mrs. Somaly",
      roleKm: "មាតាបិតាកូនកំលោះ",
      roleEn: "Groom's Parents",
    },
    bride: {
      nameKm: "កៅ ហែមសុជាតា",
      nameEn: "Kao Hemsocheata",
      shortNameKm: "សុជាតា",
      shortNameEn: "Socheata",
      titleKm: "កូនក្រមុំ",
      titleEn: "Bride",
      fatherKm: "លោក ចៅ ចិត្រ",
      fatherEn: "Mr. Chao Chitr",
      motherKm: "លោកស្រី និមល",
      motherEn: "Mrs. Nimol",
      roleKm: "មាតាបិតាកូនក្រមុំ",
      roleEn: "Bride's Parents",
    },
  },
  date: {
    gregorianKm: "ថ្ងៃសុក្រ ទី០៤ ខែធ្នូ ឆ្នាំ២០២៦",
    gregorianEn: "Friday, December 04, 2026",
    dateObj: new Date("2026-12-04T07:30:00+07:00"),
    lunarKm:
      "ត្រូវនឹងថ្ងៃសុក្រ ១០រោច ខែកត្តិក ឆ្នាំមមី អដ្ឋស័ក ពុទ្ធសករាជ ២៥៧០",
    lunarEn:
      "Lunar Date: 10th Waning Moon of Kattika, Year of the Horse, B.E. 2570",
    dayKm: "០៤",
    monthKm: "ធ្នូ",
    yearKm: "២០២៦",
    dayEn: "04",
    monthEn: "DEC",
    yearEn: "2026",
  },
  venue: {
    nameKm: "គេហដ្ឋានខាងស្រី",
    nameEn: "Bride's Family Residence",
    addressKm: "រាជធានីភ្នំពេញ / ខេត្តកណ្តាល",
    addressEn: "Phnom Penh / Kandal Province, Cambodia",
    coordinates: {
      lat: 11.498984269862891,
      lng: 104.76868908465661,
    },
    googleMapsUrl:
      "https://www.google.com/maps?q=11.498984269862891,104.76868908465661",
    embedUrl:
      "https://maps.google.com/maps?q=11.498984269862891,104.76868908465661&z=15&output=embed",
  },
  programmes: [
    {
      id: "p1",
      timeKm: "ម៉ោង ០៧:៣០ ព្រឹក",
      timeEn: "07:30 AM",
      titleKm:
        " ពិធីចៅមហានិយាយជើងការ សែនព្រេន រៀបរាប់ផ្លែឈើ និងពិសាភោជនាហារពេលព្រឹក",
      titleEn:
        " ពិធីចៅមហានិយាយជើងការ សែនព្រេន រៀបរាប់ផ្លែឈើ និងពិសាភោជនាហារពេលព្រឹក",
      iconType: "fruit",
    },
    {
      id: "p2",
      timeKm: "ម៉ោង ០៨:១៥ ព្រឹក",
      timeEn: "08:15 AM",
      titleKm: "ពិធីបំពាក់ចិញ្ជៀនអាពាហ៍ពិពាហ៍",
      titleEn: "Ring Exchange Ceremony",
      descriptionKm:
        "កូនកំលោះ និងកូនក្រមុំបំពាក់ចិញ្ជៀនភ្ជាប់និស្ស័យសច្ចាស្មោះស្ម័គ្រចំពោះមុខចាស់ទុំទាំងសងខាង។",
      descriptionEn:
        "The exchange of wedding rings as a sacred symbol of eternal fidelity and devotion.",
      iconType: "ring",
    },
    {
      id: "p3",
      timeKm: "ម៉ោង ០៩:១៥ ព្រឹក",
      timeEn: "09:15 AM",
      titleKm: "ពិធីចម្រើនព្រះបរិត្ត សូត្រមន្តលើករាសី",
      titleEn: "Buddhist Monks Blessing Ceremony",
      descriptionKm:
        "និមន្តព្រះសង្ឃចម្រើនព្រះបរិត្ត ប្រោះព្រំទឹកមន្តសិរីសួស្តី ឧទ្ទិសបុណ្យកុសល និងប្រសិទ្ធពរជ័យ។",
      descriptionEn:
        "Blessings chanted by revered monks, showering sanctified water for peace and auspicious beginnings.",
      iconType: "chant",
    },
    {
      id: "p4",
      timeKm: "ម៉ោង ១០:១៥ ព្រឹក",
      timeEn: "10:15 AM",
      titleKm: "ពិធីសំពះផ្ទឹមចងដៃ បង្វិលពពិល និងព្រះថោងតោងស្បៃ",
      titleEn: "Knot-Tying, Popil Candle Rotation & Preah Thong Ceremony",
      descriptionKm:
        "ពិធីកាត់សក់សំពះផ្ទឹម ចងអំបោះក្រហមប្រសិទ្ធពរ បង្វិលពពិល ៧ជុំ និងព្រះថោងតោងស្បៃនាងនាគ។",
      descriptionEn:
        "Sacred red string binding ritual, circling the Popil candles for harmony, followed by the legendary Preah Thong robe holding.",
      iconType: "knot",
    },
    {
      id: "p5",
      timeKm: "ម៉ោង ១២:១៥ ថ្ងៃត្រង់",
      timeEn: "12:15 PM",
      titleKm: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់បញ្ចប់កិច្ចអាពាហ៍ពិពាហ៍",
      titleEn: "Wedding Luncheon Banquet",
      descriptionKm:
        "ពិសាភោជនាហារថ្ងៃត្រង់ជួបជុំសាច់ញាតិមិត្តភក្តិ អបអរសាទរបញ្ចប់កិច្ចសិរីមង្គលពេលព្រឹក។",
      descriptionEn:
        "A celebratory lunch with beloved family and guests concluding the morning traditional rites.",
      iconType: "lunch",
    },
    {
      id: "p6",
      timeKm: "ម៉ោង ០៥:០០ ល្ងាច",
      timeEn: "05:00 PM",
      titleKm: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារដោយមេត្រីភាព",
      titleEn: "Evening Reception & Dinner Celebration",
      descriptionKm:
        "ពិធីជប់លៀងទទួលភ្ញៀវកិត្តិយសយ៉ាងមហោឡារិក រីករាយជាមួយតន្ត្រី និងអាហាររៀបចំយ៉ាងពិសិដ្ឋ។ សូមអរគុណ!",
      descriptionEn:
        "Grand evening gala dinner with enchanting music and joyous celebration of love. Thank you!",
      iconType: "banquet",
    },
  ] as CeremonyItem[],
  loveStory: [
    {
      year: "២០២០",
      titleKm: "ការជួបគ្នាដំបូង",
      titleEn: "First Glance",
      descKm:
        "ពេលវេលាដែលយើងបានស្គាល់គ្នាជាលើកដំបូង ប្រៀបដូចជាព្រំលិខិតចារទុក។ ភាពទន់ភ្លន់និងស្នាមញញឹមរបស់អ្នកធ្វើឱ្យបេះដូងខ្ញុំកក់ក្តៅ។",
      descEn:
        "A serendipitous encounter where simple smiles blossomed into an unspoken connection that warmed our hearts.",
      tone: "day",
    },
    {
      year: "២០២២",
      titleKm: "រួមដំណើរឆ្លងកាត់រាល់ឧបសគ្គ",
      titleEn: "Growing Together",
      descKm:
        "យើងបានរួមដំណើរកម្សាន្ត ឆ្លងកាត់ការលំបាក និងការសប្បាយរីករាយ។ ការយល់ចិត្តនិងការគាំទ្រគ្នាទៅវិញទៅមកកាន់តែចាក់ឫសយ៉ាងរឹងមាំ។",
      descEn:
        "Through quiet conversations and shared milestones, our mutual respect and unwavering support blossomed into true devotion.",
      tone: "golden",
    },
    {
      year: "២០២៥",
      titleKm: "ពាក្យសច្ចានៅក្រោមពន្លឺព្រះច័ន្ទ",
      titleEn: "The Promise",
      descKm:
        "នៅក្រោមពន្លឺផ្កាយនិងព្រះច័ន្ទរំលេចពន្លឺ យើងបានសន្យាថានឹងកាន់ដៃគ្នារហូតតរៀងទៅ។ ថ្ងៃនេះពាក្យសន្យានោះបានក្លាយជាការពិត។",
      descEn:
        "Beneath the calm glow of evening stars, a quiet promise was spoken to walk side by side for a lifetime.",
      tone: "dusk",
    },
    {
      year: "២០២៦",
      titleKm: "ទិវាសិរីមង្គលអាពាហ៍ពិពាហ៍",
      titleEn: "Our Sacred Wedding Day",
      descKm:
        "ថ្ងៃសុក្រ ទី០៤ ខែធ្នូ ឆ្នាំ២០២៦ ជាទំព័រប្រវត្តិសាស្ត្រថ្មីនៃជីវិតគូស្នេហ៍ ដែលយើងទាំងពីរបានសំពះផ្ទឹមសច្ចាកសាងសុភមង្គល។",
      descEn:
        "December 04, 2026: The beginning of forever as we unite our lives with blessings from our parents and dear guests.",
      tone: "evening",
    },
  ] as LoveStoryItem[],
  gift: {
    aba: {
      accountName: "ENG MARADY & KAO HEMSOCHEATA",
      accountNumber: "003 892 114",
      qrTitle: "ABA KHQR (USD / KHR)",
      currency: "USD & KHR",
    },
    acleda: {
      accountName: "KAO HEMSOCHEATA",
      accountNumber: "098 765 432",
      qrTitle: "ACLEDA KHQR",
      currency: "KHR",
    },
  },
};
