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
  rsvpWhatsApp: "923117864822",                         // 0311 7864822, written with Pakistan code 92 and no leading 0

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
      coverTitle: false,                                // start screen: no title
      coverNames: false,                                // start screen: no names
      heroDate: false,                                  // date only inside the scratch heart
      music: "audio/mehndi-90s.mp3",
      themeName: "Straight out of the 90s",
      dress: "Bright colours, gota, parandas and anything your mother wore to a mehndi in 1995."
    },
    "qawwali": {
      title: "Qawwali Night", urdu: "شبِ قوالی",
      date: "2027-01-18", time: "19:00",                // PLACEHOLDER time
      invite: "Join us for a night of qawwali under the lights.",
      program: [["7:00 PM", "Guests arrive"], ["8:00 PM", "Qawwali begins"], ["10:00 PM", "Dinner"]],    // PLACEHOLDER
      signatureUrdu: "نِگہت کا کنبہ",
      coverTitle: false,                                // start screen: no title
      coverNames: false,                                // start screen: no names
      heroDate: false,                                  // date only inside the scratch heart
      music: "audio/qawwali.mp3",
      themeName: "All black",
      dress: "Black, with a little gold if you like."
    },
    "haldi": {
      title: "Haldi", urdu: "ہلدی",
      date: "2027-01-20", time: "19:00",                // PLACEHOLDER time
      invite: "Come shower شہریار with haldi, flowers and lots of love.",
      program: [["7:00 PM", "Guests arrive"], ["7:30 PM", "Haldi ceremony"], ["9:00 PM", "Dinner"]],     // PLACEHOLDER
      coverTitle: false,                                // no "Haldi" word on the photo start screen
      heroDate: false,
      heroNames: "groom",                               // opening screen shows only the groom's name                                  // date stays hidden until the heart is scratched
      photo: { src: "img/haldi-groom.jpg", caption: "Shehryar Ahmed" },   // framed photo after the invitation line
      music: "audio/haldi.mp3",
      themeName: "جو دل چاہے پہنیں",
      dress: "کچھ بھی پہن لیں، آپ شہریار سے پیارے نہیں لگ سکتے!"
    },
    "mehndi-lagai": {
      title: "Mehndi Lagai", urdu: "مہندی لگائی",
      date: "2027-01-21", time: "19:00",                // PLACEHOLDER time
      invite: "An evening of henna, bangles and songs before the big days.",
      program: [["7:00 PM", "Guests arrive"], ["7:30 PM", "Henna for everyone"], ["9:30 PM", "Dinner"]], // PLACEHOLDER
      coverTitle: false,                                // start screen: no title
      coverNames: false,                                // start screen: no names
      heroDate: false,
      heroNames: "groom",                               // opening screen shows only the groom's name                                  // date only inside the scratch heart
      music: "audio/mehndi-lagai.mp3",
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
    "sehra-bandi": {
      title: "Sehra Bandi", titleUr: "تقریبِ سہرا بندی",   // hero title shown in Urdu
      urdu: "",
      groomName: "شہریار لالا",                           // name shown on the opening screen
      date: "2027-01-23", time: "11:00",
      coverTitle: false, coverNames: false, heroDate: false, heroNames: "groom",
      photoFirst: true,                                  // groom photo comes right after the opening screen
      photo: { src: "img/sehra-bandi-groom.jpg", caption: "" },
      kicker: false,                                     // no "Together with their families" line
      invite: "Please join us as the sehra is tied on our Beloved Shehryar Lala, with prayers and love, on the Barat.",
      program: [["11:00 AM", "Guests arrive"], ["11:30 AM", "Sehra Bandi"], ["12:30 PM", "Lunch"]],   // PLACEHOLDER
      music: "audio/sehra-bandi.mp3",
      themeName: "Ivory and gold",
      dress: "Whites, ivories and soft golds."
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
