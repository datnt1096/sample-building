export type BuildingListItem = {
  id: number;
  name: string;
  location: string;
  image: string;
};

export type Apartment = {
  unit: string;
  price: number;
  layout: string;
  image: string;
};

export type PolicyItem = {
  title: string;
  note?: string;
};

export type BuildingDetail = BuildingListItem & {
  address: string;
  zip: string;
  buildingType: string;
  heroImage: string;
  description: string;
  apartments: Apartment[];
  generalPolicies: PolicyItem[];
  additionalInfo: string[];
};

export const buildings: BuildingListItem[] = [
  {
    id: 1,
    name: "One Sutton Place",
    location: "Sutton Place",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBsXR_TlZ4qE5V-apA01kuxy78CybgQG9sfEo5FxCJ1jrdHt_xR91DG7kJ9AZLUAs1djpiA2nKsMTKPbdTV01_LKA0XT0X2lFS4hpi277eO4tio0lMvGbyfF5aSq2xQNx6KuPTE6vuiTx6atv3-tritqsyGetHYy9-IYxVvS_-JemqQHnzA3dKkhsJt4zfSarS6kWDPEpPWIeHyLCKS2hOkkeWKnm5C8dEoAg5aBGB49yDjRAwCAemlkInh9SKDMkJr9Y8ELDqa6Y_a",
  },
  {
    id: 2,
    name: "Dreamland Apartments",
    location: "Astoria, Queens",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2N6fSolP8F7qeZChkiJBcpb3AVPmYEdDobYP78NLQWtVww3Pkhyp0x9FoOIXVg8lBpuJhwAlbKd6sfrWAK6J04HWsL17io0UjHC43Hok0919FO1HBum1qpQCR89ko8WTwEJROJovWphY2pw_2ktxxd19lM4T8Ecg7UA5zQujgXtYBh9k2Y6v637ViD5DVbKjfBi4yI4eaUCcCvfsavMflN2TgFQZdT4osY8VLMPMBc6HcSkVLPnc3J3tD3oGqOC6-h85r0FB_-kQY",
  },
  {
    id: 3,
    name: "Baumann Living",
    location: "Murray Hill",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCETRtplvXN--8VSdN2L8SPz5tEAO2EG-QUDujmDLOWtP6rAZp4dWYMsWZMULm-tzWrW5WAeneyhs3KC0zr8SZn7ZKrxXRNVk3fSbdno5sQhTGPmCa3iiR3qov0DJYTgoMr8r7MfcNd8VMyVyY59yqRQkfZSsVw0Hqv5RX5VARtIekVgIOut2YTPDC31G0iO5w6hAcP4K36y6hN7_4crKHrr-WKASNWzntZNBocK7t1LkyHzRu38eZy1Bl-z5uSp784dYzHZBJ_xruE",
  },
  {
    id: 4,
    name: "South End Inc.",
    location: "Cobble Hill, BKLYN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBg_ZMMnt5tmDXBtb9ZvagAPiLy4WM_GDxkUtiKQqdSXh2UPVfBk2B6HDh7E_yJHcM-2UUrEsd3gazG8QtvamksdjIA3Jzp0bEbMwZW03-i4KbUnQ7GaSqBUAOO8alH_DW0kmYMEnlfVhhHvB-4Dqtxev1ihCjIsW5cA8NyA6RFSGij0VQIvMZxpsyqWoToRku5Eiitpw9S1_6bJy4kmbtYyOd1tL5MJ_RlW6M-HLejbwNKyxfF8KpEElIVVhSWjNgZi2mj3RP-nHCQ",
  },
  {
    id: 5,
    name: "Berry Lane Corporation",
    location: "Brooklyn Heights",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXfWNZipzuTLsfVZ4_EtVko4KHOIrIRa57dlcaSUIPGk0EsCMVhaoEYLCfy6ovUloxhfvuYVHDPyHe7Ml5ZsaECtluWJKqdmBKNBpXBdcXo69p_vt99LslK7PU7i0-CVqbrv7BtuUNIkOBWvODEfu9ZZVtMyNrtuEIKl94brwKoyM7C6t1zUV8KJWMQkEXcHCJ_yRCR5JaWua6q1QG3F-OCBPGjha2Lfkm9o6gY32hBRR61h5jE-nhGIQXDDHCpYsVrMieffy58ADE",
  },
  {
    id: 6,
    name: "York Place Apartments",
    location: "Brooklyn Heights",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBv10bKwArmSc79954a3TIKX-SUZCXWib_LKMQAenfHcHWfyzp9syY4RG227D_c9xh9YhbmCsO7CjGYIPA2Aq5gU681K_ZvKqLHzTM5M8e6UM_m1Yi0YkBZsNJpEX1HpwyvBNnu62WzasEFP3J1EMZ4_3Rshi4h-I0Iii2HEvNdjWLov397DwRuuk5Y9Awxchr-boZ6Wmy7Am5fvsI__1yDeG1KMuDGlsxSjeuT4dodL_1TSVLT9b84IkiEucCD2cyLqx_AsTwu9PDp",
  },
  {
    id: 7,
    name: "Sundarji Studios",
    location: "Lower East Side",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ0jouBqR08bj_56o2lbLv2hBVfEufPn_yoP9becMHPN4cRv_dAyK3aGQem1TcRPGgnLTdsgIUaykzaQvuI9pGEde4tL0nF0L-qi5G8RJSmBhB9cYfgUW-9dAUr26s7xV7fCaKn-cp6W46_Z1XS25K_HV5YBn4yl3Nrl-XkcSuK4ITbES3-KvYzzUp4USrIrVJfW8JjBKDhG4UhGiVXEyePKO66iO41r0p7mTSpqFlsACzp8IueDfrmxOStWE9GldUiWAscbyK4NE4",
  },
  {
    id: 8,
    name: "Parsons Pads",
    location: "Clinton Hill, BKLYN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCI4q9TRxHnEV8BjK115GwN1c-e-2akvUeOJKoHvZ2HGMv6aNelPQ6pfipufNQJDcck-Qb5Fy1QHiljE-0td6jH0Tsy_zHx0F_gFtKAu0GGbjl2GReML5S_OxeLC208vmMun9OZh-4pI5ae_nZKk83uKy7h0PeOLYX8cveU0-T_H1CtbADmbyKVEh1WpUWJcDyfIiPo80GGPyMaaYHvonLt-TutpJX7tyiflUR-dR74Doc_Z7VXbr6KT2NLgMr8Fp9dNd5mxQ2SEVhq",
  },
  {
    id: 9,
    name: "115 East 90th Street",
    location: "Upper East Side",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUZiLhHHF2B5YsmVkuG09Bg_LZbrE2ff7Gk5bOQub0SfOQwJC47b1E4ZlANeQYgnPhEq3YKMalyU2k7h9WnVXuzsOzChdg6ZQwx4qgHxoVmXnnIk8y1kBewfVSvYQ-jES-RLncgWFrKHwGd4t8Wql3ighIs07Sz4g4T0HX6XZvIJ5yiZb2RbRcJJIHaETnthz8xZvvj75mJ5MR11Jjw8Smm3Cf4T6I7J8rNgAbnxUmCDRt0VqySRbzJBitxs-I5ZjhLKPDh9MjEfom",
  },
  {
    id: 10,
    name: "Vinyl Villas",
    location: "Chelsea",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlquBBwFcHi6JvPzEneEf7O-6M7W8FMjqwzmUymN8c72egF4vgH_Zpp50IIIIgvQQ22e12luDIaMZPU3zXbJ0h9yH-lJvToO6TrysG0AUdbemPmlgQ65szG1bohCazHxg7Nbm2UdXBndpYC5_QIXqAlpryJ-7JcZQgAlJ66Wa5So3aNuqc-TPdu1YcFQ43n6ClZ3UXz4JCjeOxy7ECgsrguwxdcUtX_JDJZgj7z1Eb0OfIRkQCmOoSbWSu5IGOA1mgBfVh1_GqrCB0",
  },
];

const buildingDetails: Record<number, BuildingDetail> = {
  9: {
    id: 9,
    name: "115 East 90th Street",
    location: "Upper East Side",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUZiLhHHF2B5YsmVkuG09Bg_LZbrE2ff7Gk5bOQub0SfOQwJC47b1E4ZlANeQYgnPhEq3YKMalyU2k7h9WnVXuzsOzChdg6ZQwx4qgHxoVmXnnIk8y1kBewfVSvYQ-jES-RLncgWFrKHwGd4t8Wql3ighIs07Sz4g4T0HX6XZvIJ5yiZb2RbRcJJIHaETnthz8xZvvj75mJ5MR11Jjw8Smm3Cf4T6I7J8rNgAbnxUmCDRt0VqySRbzJBitxs-I5ZjhLKPDh9MjEfom",
    address: "115 East 90th Street",
    zip: "New York, NY 10128",
    buildingType: "Co-op",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCmdZlKrQ8jNUYHpfbks9jfDplVdIt_vPz4kNyEg0A89xHqtmqaCrQsG1_R7s4Ep00JKQin6VRskmd705DCj1unEeO2HhyO3uCg9JXBmNvlnspWgw0r8-Gb6lidqJstal83mbTmavt9u4XKN2wYDBtPVIXC04e_TDvq3AFB6tHYPb7cgyDAGcHabXB60J8rzTph3uWIJAfhUwqjgXWS1KuzYIJs6NOfFL2mxsVo3Gs_On3XSyeHfBhczEmrPOZjRD8LkgH_KQ81sSGv",
    description:
      "115 East 90th Street is a pre-war cooperative building built in 1929, then converted in 1987. The building has 13 floors with 88 units.",
    apartments: [
      {
        unit: "6F",
        price: 1800,
        layout: "1 BEDS / 1 BATH",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCrRBH1o7TzUCYOJdteRMD0Fl4f1j-gCiQXibFbd1R4rM1dhslAD9FTkNlsg-YXzh4h8lMTrc0gA81dha1MmzHhlQ9m8MNsM6umax106GlFQM5edI-dvc3N9U8noeJgRt18Ly08eLrkEd5gTzgpvSfhFBzvuvBqypkxQFCQzltNAoQSYQ6k73l-iEVgRsUgf4OqdVS3wPxvVt7Ql8Z0p0dSDA54xRXoNCibeng31_JP0UTK1OqvHR4Oy8Q22hyUt-nnNN59-M-Ertg5",
      },
      {
        unit: "1B",
        price: 1675,
        layout: "STUDIO",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCX6K0XdbvXRmGJbQ8F6FettCYNgDEb2BVIjQ6G5ZqkN8ShbiKj4G-6LvwcOCdWhZIqLK1VttwVBf5h5PD4q4jTSXYtTdGyHtYcTeYxZJFh3PCmTEzw2AR5BAWUW_Ge4jxc8fX9TTfGgsAjXohJfRRGiI7tK4dR5W_tu3lGuHLAU_XBp9esOq1iCHWzCsYhMxAFn2pLpjLBCAipl5h4-7Kr7NIrDunp6NoCPilC1ZHM6o891Ri6wIfxv-t2dh5uhGMQNWlDU3-BMkBr",
      },
      {
        unit: "4A",
        price: 2200,
        layout: "2 BEDS / 1 BATH",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAezpDFTlkprSbk7MfPfJgwvcJJcfUd95L4Ac-6YOu_RQaGH_KryK94W1vk8FDypgWFDcfOhq5E5FP5ZatN6XzfJsc5obk4sanjoiCcYkiA3L7a0O87OZ6asG8jVEvNnEXGhwfUh-Yl6r1vrnkxNjPhqeMAZqp2dLeLsHecnLRSfyyB7SrRNRWM_HahO1R2_H_t1C4vZdwvxXHNYEDuFvLqfE7d09zDAdiMlet6VWsFwIlfCf5zYko2-c3wpEMy16cezRAcOoWeC0NV",
      },
      {
        unit: "3E",
        price: 1800,
        layout: "1 BEDS / 1 BATH",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCqq6Rfxt3n59xJbxnmZlS9bDd_jNNVQeB_7_MNAC3bmCfQ_U0mO8U13000TCnGfu2jUpM-yMHyN8X4HCHOAZXKz7yE-GxRmypw53ujRrER5Mj8DL00jMfespUKM-AALyNW7CRFGvnFBxmjrDd5S3KeSRcKtliElJoEV6qxlBxAW2I3of7-UPJX4A1a267fmJPqnp_EniM2rR3H9ZyD5NYnzkFmjD8OW3h3Z6cymJ6i0DYzdZdSPUR6mPYzrjjJiYrpy7UHhWrnefA3",
      },
      {
        unit: "2C",
        price: 2125,
        layout: "1.5 BEDS / 1 BATH",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB18_C1i6s6ZObbnyw9YH_u3S1cgQ01eTXpPNqAGy_pDzR42OI6sc1t1bToD1pQqQ9O7yrAI390Mj_i1QcObZlmzN5MC0ZoC5075LdAU4NzzDf8KLaupyjaz8TpXkmmKFByOtFnaCHWpvczrt0Rg5t6pL7mVDaUy7HYtxHSY1Dy4awpkOPqcOIFAXYGgNoJHXYpAbE54gCcK0N-t9ZyuC3qD4zA-ecOFMhTlKrHF3M8cxwncB7lZDM4mDacXV38NvB1hv020eFthwpZ",
      },
      {
        unit: "5D",
        price: 2400,
        layout: "2 BEDS / 1.5 BATH",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBboX9Uznjp4EHNdm904tgP1cCWcdBrgz5rnDBkKGL4TgN6-ibbFnAWmIy8mkvK-OzvMdk4ocJqxsqlH5GePbDwVCtN0-QyysSuziSXjRdidR4vr0JTv_8VQ5RD1-nyh2uduL1uI13091_4e0KlPGiguMD-p5oI7oddsFGb0qfc9CHZi2NGqrZ8K2i2kVMvAEJmrkiWKsQXkGdaue8En8WGrREVqLGDjvlkbcNy5yeoirQrYY9FzWWoU3FhhjTAbQOG4_cMvR-iN9zM",
      },
    ],
    generalPolicies: [
      {
        title: "Pets Allowed",
        note: "Only owners may have dogs",
      },
      { title: "In-unit Washer/Dryer Allowed" },
      {
        title: "Subletting Allowed",
        note: "Shareholders can sublet immediately; 30-day minimum",
      },
      { title: "No Smoking" },
      { title: "Parents Buying for Employed Children Allowed" },
      { title: "Parents Buying for Student Children Allowed" },
    ],
    additionalInfo: [
      "Storage Available for fee",
      "Applications reviewed by Building Counsel",
    ],
  },
};

export function parseBuildingId(param: string): number | undefined {
  const id = Number(param);
  if (!Number.isInteger(id)) return undefined;
  return getBuildingById(id) ? id : undefined;
}

export function getBuildingIds(): number[] {
  return buildings.map((building) => building.id);
}

export function getBuildingById(id: number): BuildingListItem | undefined {
  return buildings.find((building) => building.id === id);
}

export function getBuildingDetailById(id: number): BuildingDetail | undefined {
  return buildingDetails[id];
}

export function getBuildingPageData(id: number): BuildingDetail | undefined {
  const listItem = getBuildingById(id);
  if (!listItem) return undefined;

  const detail = buildingDetails[id];
  if (detail) return detail;

  return {
    ...listItem,
    address: listItem.name,
    zip: `New York, NY — ${listItem.location}`,
    buildingType: "Rental",
    heroImage: listItem.image,
    description: `${listItem.name} is located in ${listItem.location}. Contact us for availability and building details.`,
    apartments: [],
    generalPolicies: [],
    additionalInfo: [],
  };
}
