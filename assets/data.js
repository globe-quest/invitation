/* =====================================================================
   WEDDING DETAILS  -  this is the only file you need to edit.
   Change a time, venue or sentence here and all cards update.
   Lines marked PLACEHOLDER are guesses until the family confirms them.
   ===================================================================== */
window.WEDDING = {
  groom: "Shehryar Ahmed",
  bride: "Alishba Khan",
  hosts: "Mr. & Mrs. Abrar Ahmed",
  signatureUrdu: "نِگہت کا کنبہ",                        // closing line at the bottom of every card

  // WhatsApp number that receives RSVPs, with country code and no + or spaces,
  // e.g. "923001234567". Leave "" and the guest picks the contact themselves.
  rsvpWhatsApp: "",

  // Used by every card unless an event below has its own "venue".
  venue: {
    name: "Kangra Colony",
    address: "Kangra Colony, Haripur, Khyber Pakhtunkhwa",
    mapQuery: "Kangra Colony, Haripur, Pakistan"       // what Google Maps searches for
  },

  events: {
    "mehndi-90s": {
      title: "90's Mehndi", urdu: "مہندی مبارک",
      date: "2027-01-16", time: "19:00",                // PLACEHOLDER time
      invite: "Rewind to the nineties with us for an evening of dholki, old songs and dancing.",
      program: [["7:00 PM", "Guests arrive"], ["8:00 PM", "Dholki and dance"], ["9:30 PM", "Dinner"]],   // PLACEHOLDER
      sealUrdu: "مہندی",                                 // word inside the gold seal on the cover
      signatureUrdu: "نِگہت کا کنبہ",                     // closing line at the bottom of the card
      music: "audio/mehndi-90s.wav",                    // replace this file with your own track if you like
      themeName: "Straight out of the 90s",
      dress: "Bright colours, gota, parandas and anything your mother wore to a mehndi in 1995."
    },
    "qawwali": {
      title: "Qawwali Night", urdu: "شبِ قوالی",
      date: "2027-01-18", time: "19:00",                // PLACEHOLDER time
      invite: "Join us for a night of qawwali under the lights.",
      program: [["7:00 PM", "Guests arrive"], ["8:00 PM", "Qawwali begins"], ["10:00 PM", "Dinner"]],    // PLACEHOLDER
      signatureUrdu: "نِگہت کا کنبہ",
      music: "audio/qawwali.wav",
      themeName: "All black",
      dress: "Black, with a little gold if you like."
    },
    "haldi": {
      title: "Haldi", urdu: "ہلدی",
      date: "2027-01-20", time: "19:00",                // PLACEHOLDER time
      invite: "Come shower the couple with haldi, flowers and plenty of love.",
      program: [["7:00 PM", "Guests arrive"], ["7:30 PM", "Haldi ceremony"], ["9:00 PM", "Dinner"]],     // PLACEHOLDER
      music: "audio/haldi.wav",
      themeName: "Bright yellow",
      dress: "Ghararas and frocks in bright yellow."
    },
    "mehndi-lagai": {
      title: "Mehndi Lagai", urdu: "مہندی لگائی",
      date: "2027-01-21", time: "19:00",                // PLACEHOLDER time
      invite: "An evening of henna, bangles and songs before the big days.",
      program: [["7:00 PM", "Guests arrive"], ["7:30 PM", "Henna for everyone"], ["9:30 PM", "Dinner"]], // PLACEHOLDER
      music: "audio/mehndi-lagai.wav",
      themeName: "Natural colours",
      dress: "Soft, earthy shades: rose, rust, sage and henna brown."
    },
    "mehndi": {
      title: "Mehndi", urdu: "مہندی",
      date: "2027-01-22", time: "19:00",                // PLACEHOLDER time
      invite: "Dhol, dance and every colour there is. Bring your loudest outfit and your best steps.",
      program: [["7:00 PM", "Guests arrive"], ["8:00 PM", "Dances and dhol"], ["10:00 PM", "Dinner"]],   // PLACEHOLDER
      themeName: "Full bright colours",
      dress: "The brighter the better. Marigold, pink, purple, green, all at once."
    },
    "barat": {
      title: "Barat", urdu: "بارات",
      date: "2027-01-23", time: "19:00",                // PLACEHOLDER time
      invite: "We request the honour of your presence as the two families come together for the Barat.",
      program: [["7:00 PM", "Guests arrive"], ["8:00 PM", "Arrival of the Barat"], ["9:30 PM", "Dinner"]], // PLACEHOLDER
      themeName: "Maroon and gold",
      dress: "The bride in maroon, the groom in gold and white. Guests in formal wear."
    },
    "walima": {
      title: "Walima", urdu: "ولیمہ",
      date: "2027-01-24", time: "19:00",                // PLACEHOLDER time
      invite: "Please join us for the Walima as we celebrate the newly married couple.",
      program: [["7:00 PM", "Guests arrive"], ["8:00 PM", "Arrival of the couple"], ["9:00 PM", "Dinner"]], // PLACEHOLDER
      themeName: "Royal",
      dress: "Formal wear in ivory, gold and soft pastels."
    }
  }
};
