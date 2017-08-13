const statesOptions = [{value: "johor", content: "Johor"}, {value: "kedah", content: "Kedah"}, {value: "kelantan", content: "Kelantan"}, {value: "kuala_lumpur", content: "Kuala_lumpur"}, {value: "labuan", content: "Labuan"}, {value: "melaka", content: "Melaka"}, {value: "negeri_sembilan", content: "Negeri_sembilan"}, {value: "pahang", content: "Pahang"}, {value: "perak", content: "Perak"}, {value: "perlis", content: "Perlis"}, {value: "pulau_pinang", content: "Pulau_pinang"}, {value: "putrajaya", content: "Putrajaya"}, {value: "sabah", content: "Sabah"}, {value: "sarawak", content: "Sarawak"}, {value: "selangor", content: "Selangor"}, {value: "terengganu", content: "Terengganu"}]
const statesAndZones = {
  "johor": ['JHR01', 'JHR02', 'JHR03', 'JHR04'],
  "kedah":     ['KDH01', 'KDH02', 'KDH03', 'KDH04', 'KDH05', 'KDH06', 'KDH07'],
  "kelantan": ['KTN01', 'KTN03'],
  "kuala_lumpur" :["SGR03"],
  "labuan":["WLY02"],
  "melaka":["MLK01"],
  "negeri_sembilan":[ 'NGS01', 'NGS02'],
  "pahang":       ['PHG01', 'PHG02', 'PHG03', 'PHG04', 'PHG05', 'PHG06'],
  "perak":       ['PRK01', 'PRK02', 'PRK03', 'PRK04', 'PRK05', 'PRK06', 'PRK07'],
  "perlis":["PLS01"],
  "pulau_pinang":["PNG01"],
  "putrajaya":["SGR04"]
  "sabah":       ['SBH01', 'SBH02', 'SBH03', 'SBH04', 'SBH05', 'SBH06', 'SBH07', 'SBH08', 'SBH09'],
  "sarawak":       ['SWK01', 'SWK02', 'SWK03', 'SWK04', 'SWK05', 'SWK06', 'SWK07', 'SWK08', 'SWK09'],
  "selangor":       ['SGR01', 'SGR02'],
  "terengganu":       ['SGR01', 'SGR02']

}

const zonesForStates = {'johor': [{value: 'JHR02', content: 'JHR01: Pulau Aur , Pemanggil '}, {value: 'JHR03', content: 'JHR02: Kota Tinggi, Mersing, Johor Bahru'}, {value: 'JHR04', content: 'JHR03: Kluang , Pontian'}], 'kedah': [{value: 'KDH01', content: 'JHR04: Batu Pahat, Muar, Segamat, Gemas'}, {value: 'KDH02', content: 'KDH01: Kota Setar, Kubang Pasu, Pokok Sena'}, {value: 'KDH03', content: 'KDH02: Pendang, Kuala Muda, Yan'}, {value: 'KDH04', content: 'KDH03: Padang Terap, Sik'}, {value: 'KDH05', content: 'KDH04: Baling'}, {value: 'KDH06', content: 'KDH05: Kulim, Bandar Bahru'}, {value: 'KDH07', content: 'KDH06: Langkawi'}], 'kelantan': [{value: 'KTN01', content: 'KDH07: Gunung Jerai'}, {value: 'KTN03', content: 'KTN01: K.Bharu, Bachok, Pasir Puteh, Tumpat, Pasir Mas, Tnh. Merah, Machang, Kuala Krai, Mukim Chiku'}], 'kuala lumpur': [{value: 'SGR03', content: 'KTN03: Jeli, Gua Musang (Mukim Galas, Bertam)'}], 'labuan': [{value: 'WLY02', content: 'SGR03: Kuala Lumpur'}], 'melaka': [{value: 'MLK01', content: 'WLY02: Labuan'}], 'negeri_sembilan': [{value: 'NGS01', content: 'MLK01: Bandar Melaka, Alor Gajah, Jasin, Masjid Tanah, Merlimau, Nyalas'}, {value: 'NGS02', content: 'NGS01: Jempol, Tampin'}], 'pahang': [{value: 'PHG01', content: 'NGS02: Port Dickson, Seremban, Kuala Pilah, Jelebu, Rembau'}, {value: 'PHG02', content: 'PHG01: Pulau Tioman'}, {value: 'PHG03', content: 'PHG02: Kuantan, Pekan, Rompin, Muadzam Shah'}, {value: 'PHG04', content: 'PHG03: Maran, Chenor, Temerloh, Bera, Jerantut'}, {value: 'PHG05', content: 'PHG04: Bentong, Raub, Kuala Lipis'}, {value: 'PHG06', content: 'PHG05: Genting Sempah, Janda Baik, Bukit Tinggi'}], 'perak': [{value: 'PRK01', content: 'PHG06: Bukit Fraser, Genting Higlands, Cameron Higlands'}, {value: 'PRK02', content: 'PRK01: Tapah, Slim River , Tanjung Malim'}, {value: 'PRK03', content: 'PRK02: Ipoh, Batu Gajah, Kampar, Sg. Siput, Kuala Kangsar'}, {value: 'PRK04', content: 'PRK03: Pengkalan Hulu, Grik, Lenggong'}, {value: 'PRK05', content: 'PRK04: Temengor , Belum'}, {value: 'PRK06', content: 'PRK05: Teluk Intan, Bagan Datoh, Kg.Gajah, Sri Iskandar, Beruas, Parit, Lumut, Setiawan , Pulau Pangkor'}, {value: 'PRK07', content: 'PRK06: Selama, Taiping, Bagan Serai, Parit Buntar'}], 'perlis': [{value: 'PLS01', content: 'PRK07: Bukit Larut'}], 'pulau_pinang': [{value: 'PNG01', content: 'PLS01: Kangar, Padang Besar, Arau'}], 'putrajaya': [{value: 'SGR04', content: 'PNG01: Seluruh Negeri Pulau Pinang'}], 'sabah': [{value: 'SBH01', content: 'SGR04: Putrajaya'}, {value: 'SBH02', content: 'SBH01: Sandakan, Bdr. Bkt. Garam, Semawang, Temanggong, Tambisan'}, {value: 'SBH03', content: 'SBH02: Pinangah, Terusan, Beluran, Kuamut, Telupit'}, {value: 'SBH04', content: 'SBH03: Lahad Datu, Kunak, Silabukan, Tungku, Sahabat, Semporna'}, {value: 'SBH05', content: 'SBH04: Tawau, Balong, Merotai, Kalabakan'}, {value: 'SBH06', content: 'SBH05: Kudat, Kota Marudu, Pitas, Pulau Banggi'}, {value: 'SBH07', content: 'SBH06: Gunung Kinabalu'}, {value: 'SBH08', content: 'SBH07: Papar, Ranau, Kota Belud, Tuaran, Penampang, Kota Kinabalu'}, {value: 'SBH09', content: 'SBH08: Pensiangan, Keningau, Tambunan, Nabawan'}], 'sarawak': [{value: 'SWK01', content: 'SBH09: Sipitang, Membakut, Beaufort, Kuala Penyu, Weston, Tenom, Long Pa Sia'}, {value: 'SWK02', content: 'SWK01: Limbang, Sundar, Trusan, Lawas'}, {value: 'SWK03', content: 'SWK02: Niah, Bekenu, Miri, Sibuti, Marudi'}, {value: 'SWK04', content: 'SWK03: Tatau, Suai, Belaga, Pandan, Sebauh, Bintulu'}, {value: 'SWK05', content: 'SWK04: Igan, Oya, Balingian, Mukah, Dalat, Sibu, Kanowit, Kapit, Song'}, {value: 'SWK06', content: 'SWK05: Tanjung Manis, Belawai, Matu, Daro, Sarikei, Julau, Bintangor, Rajang'}, {value: 'SWK07', content: 'SWK06: Kabong, Lingga, Sri Aman, Engkelili, Lubok Antu, Betong, Spaoh, Pusa, Saratok, Roban, Debak'}, {value: 'SWK08', content: 'SWK07: Samarahan, Simunjan, Serian, Sebuyau, Meludam'}, {value: 'SWK09', content: 'SWK08: Kuching, Bau, Lundu, Sematan'}], 'selangor': [{value: 'SGR01', content: 'SWK09: Zon Khas'}, {value: 'SGR02', content: 'SGR01: Gombak, H.Selangor, Rawang, H.Langat, Sepang, Petaling, S.Alam'}], 'terengganu': [{value: 'TRG01', content: 'SGR02: Sabak Bernam, Kuala Selangor, Klang, Kuala Langat'}, {value: 'TRG02', content: 'TRG01: Kuala Terengganu, Marang'}, {value: 'TRG03', content: 'TRG02: Besut, Setiu'}, {value: 'TRG04', content: 'TRG03: Hulu Terengganu'}]}
