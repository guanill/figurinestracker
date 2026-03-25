import type { AppState, Figurine } from '../types';
import { now } from '../lib/utils';

// Stable IDs so data is consistent across resets
const SMISKI_BRAND_ID = 'brand-smiski';
const HIRONO_BRAND_ID = 'brand-hirono';

// Smiski Series IDs
const S1_ID = 'series-s1';
const S2_ID = 'series-s2';
const S3_ID = 'series-s3';
const S4_ID = 'series-s4';
const LIVING_ID = 'series-living';
const BATH_ID = 'series-bath';
const TOILET_ID = 'series-toilet';
const BED_ID = 'series-bed';
const YOGA_ID = 'series-yoga';
const CHEER_ID = 'series-cheer';
const MUSEUM_ID = 'series-museum';
const WORK_ID = 'series-work';
const DRESSING_ID = 'series-dressing';
const EXERCISING_ID = 'series-exercising';
const MOVING_ID = 'series-moving';
const HIPPERS_ID = 'series-hippers';
const SUNDAY_ID = 'series-sunday';
const BIRTHDAY_ID = 'series-birthday';

// Hirono Series IDs
const H_OTHER_ONE_ID = 'series-h-other-one';
const H_LITTLE_MISCHIEF_ID = 'series-h-little-mischief';
const H_MIME_ID = 'series-h-mime';
const H_RESHAPE_ID = 'series-h-reshape';
const H_SHELTER_ID = 'series-h-shelter';
const H_LE_PETIT_PRINCE_ID = 'series-h-le-petit-prince';
const H_ECHO_ID = 'series-h-echo';
const H_MONSTERS_ID = 'series-h-monsters';

function fig(brandId: string, seriesId: string, name: string, imageUrl: string, variant: 'regular' | 'secret' = 'regular'): Figurine {
  const id = `fig-${seriesId}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const ts = now();
  return {
    id,
    brandId,
    seriesId,
    name,
    status: 'wishlist',
    variant,
    imageUrl,
    notes: '',
    acquiredDate: '',
    tradingFor: '',
    favorite: false,
    createdAt: ts,
    updatedAt: ts,
  };
}

// Shorthand helpers
const sfig = (seriesId: string, name: string, imageUrl: string, variant: 'regular' | 'secret' = 'regular') =>
  fig(SMISKI_BRAND_ID, seriesId, name, imageUrl, variant);
const hfig = (seriesId: string, name: string, imageUrl: string, variant: 'regular' | 'secret' = 'regular') =>
  fig(HIRONO_BRAND_ID, seriesId, name, imageUrl, variant);

const SMISKI_FIGURINES: Figurine[] = [
  // Series 1 (2016)
  sfig(S1_ID, 'Hugging Knees', 'https://smiski.com/e/wp-content/uploads/2016/03/s1_01.png'),
  sfig(S1_ID, 'Sitting', 'https://smiski.com/e/wp-content/uploads/2016/03/s1_02.png'),
  sfig(S1_ID, 'Looking Back', 'https://smiski.com/e/wp-content/uploads/2016/03/s1_03.png'),
  sfig(S1_ID, 'Lounging', 'https://smiski.com/e/wp-content/uploads/2016/03/s1_04.png'),
  sfig(S1_ID, 'Hiding', 'https://smiski.com/e/wp-content/uploads/2016/03/s1_05.png'),
  sfig(S1_ID, 'Peeking', 'https://smiski.com/e/wp-content/uploads/2016/03/s1_06.png'),

  // Series 2 (2016)
  sfig(S2_ID, 'Kneeling', 'https://smiski.com/e/wp-content/uploads/2016/03/s2_01.png'),
  sfig(S2_ID, 'Climbing', 'https://smiski.com/e/wp-content/uploads/2016/03/s2_02.png'),
  sfig(S2_ID, 'Daydreaming', 'https://smiski.com/e/wp-content/uploads/2016/03/s2_03.png'),
  sfig(S2_ID, 'Pushing', 'https://smiski.com/e/wp-content/uploads/2016/03/s2_04.png'),
  sfig(S2_ID, 'Peeking', 'https://smiski.com/e/wp-content/uploads/2016/03/s2_05.png'),
  sfig(S2_ID, 'Listening', 'https://smiski.com/e/wp-content/uploads/2016/03/s2_06.png'),

  // Series 3 (2016)
  sfig(S3_ID, 'Bridge', 'https://smiski.com/e/wp-content/uploads/2016/09/3_3.png'),
  sfig(S3_ID, 'Peeking', 'https://smiski.com/e/wp-content/uploads/2016/09/3_4.png'),
  sfig(S3_ID, 'Climbing', 'https://smiski.com/e/wp-content/uploads/2016/09/3_5.png'),
  sfig(S3_ID, 'Little', 'https://smiski.com/e/wp-content/uploads/2016/09/3_6.png'),
  sfig(S3_ID, 'Hiding', 'https://smiski.com/e/wp-content/uploads/2016/09/3_7.png'),
  sfig(S3_ID, 'Handstand', 'https://smiski.com/e/wp-content/uploads/2016/09/3_8.png'),

  // Series 4 (2017)
  sfig(S4_ID, 'Sneaking', 'https://smiski.com/e/wp-content/uploads/2017/02/3_3.png'),
  sfig(S4_ID, 'Scared', 'https://smiski.com/e/wp-content/uploads/2017/02/3_4.png'),
  sfig(S4_ID, 'Relaxing', 'https://smiski.com/e/wp-content/uploads/2017/02/3_5.png'),
  sfig(S4_ID, 'Lazy', 'https://smiski.com/e/wp-content/uploads/2017/02/3_6.png'),
  sfig(S4_ID, 'Stuck', 'https://smiski.com/e/wp-content/uploads/2017/02/3_7.png'),
  sfig(S4_ID, 'Defeated', 'https://smiski.com/e/wp-content/uploads/2017/02/3_8.png'),

  // Living (2018)
  sfig(LIVING_ID, 'Thinking', 'https://aa243gcvbg.smartrelease.jp/wp-content/uploads/2018/08/01.png'),
  sfig(LIVING_ID, 'Hiding', 'https://aa243gcvbg.smartrelease.jp/wp-content/uploads/2018/08/02.png'),
  sfig(LIVING_ID, 'Nap Time', 'https://aa243gcvbg.smartrelease.jp/wp-content/uploads/2018/08/03.png'),
  sfig(LIVING_ID, 'Playing', 'https://aa243gcvbg.smartrelease.jp/wp-content/uploads/2018/08/04.png'),
  sfig(LIVING_ID, 'Daydreaming', 'https://aa243gcvbg.smartrelease.jp/wp-content/uploads/2018/08/05.png'),
  sfig(LIVING_ID, 'Lifting', 'https://aa243gcvbg.smartrelease.jp/wp-content/uploads/2018/08/06.png'),

  // Bath (2017)
  sfig(BATH_ID, 'Shampooing', 'https://smiski.com/e/wp-content/uploads/2017/10/awadateski.png'),
  sfig(BATH_ID, 'Not Looking', 'https://smiski.com/e/wp-content/uploads/2017/10/tereski.png'),
  sfig(BATH_ID, 'Scrubbing', 'https://smiski.com/e/wp-content/uploads/2017/10/araikkoski.png'),
  sfig(BATH_ID, 'With Duck', 'https://smiski.com/e/wp-content/uploads/2017/10/ahirumochiski.png'),
  sfig(BATH_ID, 'Dazed', 'https://smiski.com/e/wp-content/uploads/2017/10/noboseski.png'),
  sfig(BATH_ID, 'Looking', 'https://smiski.com/e/wp-content/uploads/2017/10/mitaski.png'),

  // Toilet (2017)
  sfig(TOILET_ID, 'Peek-A-Boo', 'https://smiski.com/e/wp-content/uploads/2017/10/hyokkoriski.png'),
  sfig(TOILET_ID, 'Little (Smelly)', 'https://smiski.com/e/wp-content/uploads/2017/10/chibikusaski.png'),
  sfig(TOILET_ID, 'Squatting', 'https://smiski.com/e/wp-content/uploads/2017/10/shagamiski.png'),
  sfig(TOILET_ID, 'Helping Out', 'https://smiski.com/e/wp-content/uploads/2017/10/sashidashiski.png'),
  sfig(TOILET_ID, 'Resting', 'https://smiski.com/e/wp-content/uploads/2017/10/koshikakeski.png'),
  sfig(TOILET_ID, 'Holding In', 'https://smiski.com/e/wp-content/uploads/2017/10/gamanski.png'),

  // Bed (2019)
  sfig(BED_ID, 'Before Rest', 'https://smiski.com/e/wp-content/uploads/2019/07/img_bed_products_01.png'),
  sfig(BED_ID, 'Sleepy', 'https://smiski.com/e/wp-content/uploads/2019/07/img_bed_products_02.png'),
  sfig(BED_ID, 'Co-Sleeping', 'https://smiski.com/e/wp-content/uploads/2019/07/img_bed_products_03.png'),
  sfig(BED_ID, 'Reading', 'https://smiski.com/e/wp-content/uploads/2019/07/img_bed_products_04.png'),
  sfig(BED_ID, 'At Sleep', 'https://smiski.com/e/wp-content/uploads/2019/07/img_bed_products_05.png'),
  sfig(BED_ID, 'Fussing', 'https://smiski.com/e/wp-content/uploads/2019/07/img_bed_products_06.png'),

  // Yoga (2019)
  sfig(YOGA_ID, 'Lotus Pose', 'https://smiski.com/e/wp-content/uploads/2019/09/img_yoga_01.png'),
  sfig(YOGA_ID, 'Twist Pose', 'https://smiski.com/e/wp-content/uploads/2019/09/img_yoga_02.png'),
  sfig(YOGA_ID, 'Shoulderstand Pose', 'https://smiski.com/e/wp-content/uploads/2019/09/img_yoga_03.png'),
  sfig(YOGA_ID, 'Triangle Pose', 'https://smiski.com/e/wp-content/uploads/2019/09/img_yoga_04.png'),
  sfig(YOGA_ID, 'Tree Pose', 'https://smiski.com/e/wp-content/uploads/2019/09/img_yoga_05.png'),
  sfig(YOGA_ID, 'Ship Pose', 'https://smiski.com/e/wp-content/uploads/2019/09/img_yoga_06.png'),

  // Cheer (2020)
  sfig(CHEER_ID, 'Marching', 'https://smiski.com/e/wp-content/uploads/2020/12/img_cheer_02.png'),
  sfig(CHEER_ID, 'On Drums', 'https://smiski.com/e/wp-content/uploads/2020/12/img_cheer_03.png'),
  sfig(CHEER_ID, 'On Your Side', 'https://smiski.com/e/wp-content/uploads/2020/12/img_cheer_04.png'),
  sfig(CHEER_ID, 'Dancing', 'https://smiski.com/e/wp-content/uploads/2020/12/img_cheer_05.png'),
  sfig(CHEER_ID, 'Little Cheerleading', 'https://smiski.com/e/wp-content/uploads/2020/12/img_cheer_06.png'),
  sfig(CHEER_ID, 'Cheering', 'https://smiski.com/e/wp-content/uploads/2020/12/img_cheer_01.png'),

  // Museum (2020)
  sfig(MUSEUM_ID, 'The Source', 'https://smiski.com/e/wp-content/uploads/2020/12/img_museum_products_01.png'),
  sfig(MUSEUM_ID, 'Fujin & Raijin', 'https://smiski.com/e/wp-content/uploads/2020/12/img_museum_products_02.png'),
  sfig(MUSEUM_ID, 'Bacchus', 'https://smiski.com/e/wp-content/uploads/2020/12/img_museum_products_03.png'),
  sfig(MUSEUM_ID, 'Velázquez', 'https://smiski.com/e/wp-content/uploads/2020/12/img_museum_products_04.png'),
  sfig(MUSEUM_ID, 'Dalí', 'https://smiski.com/e/wp-content/uploads/2020/12/img_museum_products_05.png'),
  sfig(MUSEUM_ID, 'Pearl Earring', 'https://smiski.com/e/wp-content/uploads/2020/12/img_museum_products_06.png'),

  // @Work (2022)
  sfig(WORK_ID, 'Approving', 'https://smiski.com/e/wp-content/uploads/2022/02/img_work_products_01.png'),
  sfig(WORK_ID, 'Researching', 'https://smiski.com/e/wp-content/uploads/2022/02/img_work_products_02.png'),
  sfig(WORK_ID, 'Presenting', 'https://smiski.com/e/wp-content/uploads/2022/02/img_work_products_03.png'),
  sfig(WORK_ID, 'Good Idea', 'https://smiski.com/e/wp-content/uploads/2022/02/img_work_products_04.png'),
  sfig(WORK_ID, 'On the Road', 'https://smiski.com/e/wp-content/uploads/2022/02/img_work_products_05.png'),
  sfig(WORK_ID, 'Little Group Think', 'https://smiski.com/e/wp-content/uploads/2022/02/img_work_products_06.png'),

  // Dressing (2022)
  sfig(DRESSING_ID, 'Underpants', 'https://smiski.com/e/wp-content/uploads/2022/10/img_underpants_2.png'),
  sfig(DRESSING_ID, 'Struggling', 'https://smiski.com/e/wp-content/uploads/2022/10/img_struggling.png'),
  sfig(DRESSING_ID, 'Loose Pants', 'https://smiski.com/e/wp-content/uploads/2022/10/img_loose-pants.png'),
  sfig(DRESSING_ID, 'Putting On Socks', 'https://smiski.com/e/wp-content/uploads/2022/10/img_putting-on-socks_2.png'),
  sfig(DRESSING_ID, 'Sweater', 'https://smiski.com/e/wp-content/uploads/2022/10/img_sweater.png'),
  sfig(DRESSING_ID, 'Tight Pants', 'https://smiski.com/e/wp-content/uploads/2022/10/img_tight-pants.png'),

  // Exercising (2023)
  sfig(EXERCISING_ID, 'Doing Crunches', 'https://smiski.com/e/wp-content/uploads/2023/05/img_doingcrunches.png'),
  sfig(EXERCISING_ID, 'Aerobics', 'https://smiski.com/e/wp-content/uploads/2023/05/img_aerobics.png'),
  sfig(EXERCISING_ID, 'Little Balance', 'https://smiski.com/e/wp-content/uploads/2023/05/img_balance.png'),
  sfig(EXERCISING_ID, 'Dumbbell', 'https://smiski.com/e/wp-content/uploads/2023/05/img_dumbbell.png'),
  sfig(EXERCISING_ID, 'Hoop', 'https://smiski.com/e/wp-content/uploads/2023/05/img_hulahoop.png'),
  sfig(EXERCISING_ID, 'Stretch', 'https://smiski.com/e/wp-content/uploads/2023/05/img_stretch.png'),

  // Moving (2024)
  sfig(MOVING_ID, 'Carrying Ladder', 'https://smiski.com/e/wp-content/uploads/2024/01/carrying-ladder.png'),
  sfig(MOVING_ID, 'Balancing Boxes', 'https://smiski.com/e/wp-content/uploads/2024/01/balancing-boxes.png'),
  sfig(MOVING_ID, 'Decorating', 'https://smiski.com/e/wp-content/uploads/2024/01/decorating.png'),
  sfig(MOVING_ID, 'Little Teamwork', 'https://smiski.com/e/wp-content/uploads/2024/01/teamwork.png'),
  sfig(MOVING_ID, 'Green Thumb', 'https://smiski.com/e/wp-content/uploads/2024/01/green-thumb.png'),
  sfig(MOVING_ID, 'Falling Down', 'https://smiski.com/e/wp-content/uploads/2024/01/falling-down.png'),

  // Hippers (2024)
  sfig(HIPPERS_ID, 'On His Smartphone', 'https://smiski.com/e/wp-content/uploads/2024/09/hippers_01.png'),
  sfig(HIPPERS_ID, 'Trying to Climb', 'https://smiski.com/e/wp-content/uploads/2024/09/hippers_02.png'),
  sfig(HIPPERS_ID, 'Looking Out', 'https://smiski.com/e/wp-content/uploads/2024/09/hippers_03.png'),
  sfig(HIPPERS_ID, 'Sticking', 'https://smiski.com/e/wp-content/uploads/2024/09/hippers_04.png'),
  sfig(HIPPERS_ID, 'Dozing', 'https://smiski.com/e/wp-content/uploads/2024/09/hippers_05.png'),
  sfig(HIPPERS_ID, 'Upside Down', 'https://smiski.com/e/wp-content/uploads/2024/09/hippers_06.png'),

  // Sunday (2025)
  sfig(SUNDAY_ID, 'Blowing Bubbles', 'https://smiski.com/e/wp-content/uploads/2025/02/img_product_sunday01.png'),
  sfig(SUNDAY_ID, 'Paper Airplane', 'https://smiski.com/e/wp-content/uploads/2025/02/img_product_sunday02.png'),
  sfig(SUNDAY_ID, 'Sunbathing', 'https://smiski.com/e/wp-content/uploads/2025/02/img_product_sunday03.png'),
  sfig(SUNDAY_ID, 'Sing-Along', 'https://smiski.com/e/wp-content/uploads/2025/02/img_product_sunday04.png'),
  sfig(SUNDAY_ID, 'Skateboarding', 'https://smiski.com/e/wp-content/uploads/2025/02/img_product_sunday05.png'),
  sfig(SUNDAY_ID, 'Gardening', 'https://smiski.com/e/wp-content/uploads/2025/02/img_product_sunday06.png'),

  // Birthday (2025)
  sfig(BIRTHDAY_ID, 'Giving a Bouquet', 'https://smiski.com/e/wp-content/uploads/2025/09/img_birthday01.png'),
  sfig(BIRTHDAY_ID, 'Wrapped Up', 'https://smiski.com/e/wp-content/uploads/2025/09/img_birthday02.png'),
  sfig(BIRTHDAY_ID, 'Popping Confetti', 'https://smiski.com/e/wp-content/uploads/2025/09/img_birthday03.png'),
  sfig(BIRTHDAY_ID, 'Birthday Message', 'https://smiski.com/e/wp-content/uploads/2025/09/img_birthday04.png'),
  sfig(BIRTHDAY_ID, 'Little Decorating', 'https://smiski.com/e/wp-content/uploads/2025/09/img_birthday05.png'),
  sfig(BIRTHDAY_ID, 'Tasting', 'https://smiski.com/e/wp-content/uploads/2025/09/img_birthday06.png'),
];

const ATF = 'https://arttoyfamilia.com/cdn/shop/files/';

const HIRONO_FIGURINES: Figurine[] = [
  // The Other One (2021)
  hfig(H_OTHER_ONE_ID, 'Vagrancy', `${ATF}popmart_Hirono_The_Other_One_Series_Vagrancy.png`),
  hfig(H_OTHER_ONE_ID, 'Cuckoo', `${ATF}popmart_hirono_the_other_one_series_Cuckoo.png`),
  hfig(H_OTHER_ONE_ID, 'The Ghost', `${ATF}popmart_Hirono_The_Other_One_Series_Ghost.png`),
  hfig(H_OTHER_ONE_ID, 'Nowhere Safe', `${ATF}popmart_Hirono_The_Other_One_Series_Nowhere_Safe.png`),
  hfig(H_OTHER_ONE_ID, 'Raving', `${ATF}popmart_Hirono_The_Other_One_Series_Raving.png`),
  hfig(H_OTHER_ONE_ID, 'Being Alive', `${ATF}popmart_hirono_the_other_one_series_Boxing_Alive.png`),
  hfig(H_OTHER_ONE_ID, 'The Monster', `${ATF}popmart_hirono_the_other_one_series_The_Monster.png`),
  hfig(H_OTHER_ONE_ID, 'Amnesia', `${ATF}popmart_Hirono_The_Other_One_Series_Amnesia.png`),
  hfig(H_OTHER_ONE_ID, 'The Crow', `${ATF}popmart_hirono_the_other_one_series_The_Crow.png`),
  hfig(H_OTHER_ONE_ID, 'The Fox', `${ATF}popmart_Hirono_The_Other_One_Series_The_Fox.png`),
  hfig(H_OTHER_ONE_ID, 'Staring', `${ATF}popmart_hirono_the_other_one_series_Staring.png`),
  hfig(H_OTHER_ONE_ID, 'Marionette', `${ATF}popmart_hirono_the_other_one_series_Marionette.png`),
  hfig(H_OTHER_ONE_ID, 'Dreaming', `${ATF}popmart_hirono_the_other_one_Dreaming_secret.png`, 'secret'),

  // Little Mischief (2022)
  hfig(H_LITTLE_MISCHIEF_ID, 'Loose Fish', `${ATF}popmart_hirono_little_mischief_loose_fish.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Manacle', `${ATF}popmart_hirono_little_mischief_manacle.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'The Aviator', `${ATF}popmart_hirono_little_mischief_The_Aviator.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Protector', `${ATF}popmart_hirono_little_mischief_protector.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Persona', `${ATF}popmart_hirono_little_mischief_persona.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Robot', `${ATF}popmart_hirono_little_mischief_robot_2.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Birdman', `${ATF}popmart_hirono_little_mischief_birdman.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Ragpicker', `${ATF}popmart_hirono_little_mischief_ragpicker.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Destroyer', `${ATF}popmart_hirono_little_mischief_destroyer.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Pretender', `${ATF}popmart_hirono_little_mischief_pretender.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Boiling Frog', `${ATF}popmart_hirono_little_mischief_boiling_frog.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Float', `${ATF}popmart_hirono_little_mischief_float.jpg`),
  hfig(H_LITTLE_MISCHIEF_ID, 'Unknown Journey', `${ATF}popmart_hirono_little_mischief_unknown_journey.jpg`, 'secret'),

  // Mime (2023)
  hfig(H_MIME_ID, 'Guardian', `${ATF}popmart_hirono_mime_guardian.jpg`),
  hfig(H_MIME_ID, 'Blind', `${ATF}popmart_hirono_mime_blind.jpg`),
  hfig(H_MIME_ID, 'Seeker', `${ATF}popmart_hirono_mime_seeker.jpg`),
  hfig(H_MIME_ID, 'Devilry', `${ATF}popmart_hirono_mime_devilry.jpg`),
  hfig(H_MIME_ID, 'Drifter', `${ATF}popmart_hirono_mime_drifter.jpg`),
  hfig(H_MIME_ID, 'Fool', `${ATF}popmart_hirono_mime_fool.jpg`),
  hfig(H_MIME_ID, 'Patience', `${ATF}popmart_hirono_mime_patience.jpg`),
  hfig(H_MIME_ID, 'Unspoken', `${ATF}popmart_hirono_mime_unspoken.jpg`),
  hfig(H_MIME_ID, 'Prison', `${ATF}popmart_hirono_mime_prison.jpg`),
  hfig(H_MIME_ID, 'Destroy', `${ATF}popmart_hirono_mime_destroy.jpg`),
  hfig(H_MIME_ID, 'Poem', `${ATF}popmart_hirono_mime_poem.jpg`),
  hfig(H_MIME_ID, 'Secrecy', `${ATF}popmart_hirono_mime_secrecy.jpg`),
  hfig(H_MIME_ID, 'Silence', `${ATF}popmart_hirono_mime_silence_secret.jpg`, 'secret'),

  // Reshape (2023)
  hfig(H_RESHAPE_ID, 'Burst', `${ATF}popmart_hirono_reshape_series_burst.png`),
  hfig(H_RESHAPE_ID, 'Wood Carving', `${ATF}popmart_Hirono_Reshape_Series_Wood_Carving.png`),
  hfig(H_RESHAPE_ID, 'Fading', `${ATF}popmart_Hirono_Reshape_Series_Fading.png`),
  hfig(H_RESHAPE_ID, 'Healing', `${ATF}popmart_hirono_reshape_series_healing.png`),
  hfig(H_RESHAPE_ID, 'Paradise Lost', `${ATF}popmart_hirono_reshape_series_paradise_lost.png`),
  hfig(H_RESHAPE_ID, 'Drowning', `${ATF}popmart_hirono_reshape_series_drowning.png`),
  hfig(H_RESHAPE_ID, 'Costume', `${ATF}popmart_hirono_reshape_series_costume.png`),
  hfig(H_RESHAPE_ID, 'Parasite', `${ATF}popmart_hirono_reshape_series_parasite.png`),
  hfig(H_RESHAPE_ID, 'Voyage', `${ATF}popmart_Hirono_Reshape_Series_Voyage.png`),
  hfig(H_RESHAPE_ID, 'Puppet', `${ATF}popmart_Hirono_Reshape_Series_Puppet_secrete.png`, 'secret'),

  // Shelter (2024)
  hfig(H_SHELTER_ID, 'Birdy', `${ATF}popmart_hirono_shelter_birdy.png`),
  hfig(H_SHELTER_ID, 'Poet', `${ATF}popmart_hirono_shelter_poet.png`),
  hfig(H_SHELTER_ID, 'Alien', `${ATF}popmart_hirono_shelter_alien.png`),
  hfig(H_SHELTER_ID, 'Warrior', `${ATF}popmart_hirono_shelter_warrior.png`),
  hfig(H_SHELTER_ID, 'Sunny Doll', `${ATF}popmart_hirono_shelter_sunny_doll.png`),
  hfig(H_SHELTER_ID, 'Candleholder', `${ATF}popmart_hirono_shelter_candle_holder.png`),
  hfig(H_SHELTER_ID, 'Mantel Clock', `${ATF}popmart_hirono_shelter_mantel_clock.png`),
  hfig(H_SHELTER_ID, 'Bird Cage', `${ATF}popmart_hirono_shelter_bird_cage.png`),
  hfig(H_SHELTER_ID, 'Traffic Cone', `${ATF}popmart_hirono_shelter_traffic_cone.png`),
  hfig(H_SHELTER_ID, 'Fort', `${ATF}popmart_hirono_shelter_fort.png`),
  hfig(H_SHELTER_ID, 'Circus', `${ATF}popmart_hirono_shelter_circus.png`),
  hfig(H_SHELTER_ID, 'Cabin', `${ATF}popmart_hirono_shelter_cabin.png`),
  hfig(H_SHELTER_ID, 'Stuffed Bear', `${ATF}popmart_hirono_shelter_stuffed_bear.png`, 'secret'),

  // Le Petit Prince (2024)
  hfig(H_LE_PETIT_PRINCE_ID, 'The Little Prince', `${ATF}hirono_le_petit_prince_The_Little_Prince.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Rose', `${ATF}hirono_le_petit_prince_The_Rose.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The King', `${ATF}hirono_le_petit_prince_The_King.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Conceited Man', `${ATF}hirono_le_petit_prince_the_conceited_man.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Tippler', `${ATF}hirono_le_petit_prince_the_tippler.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Businessman', `${ATF}hirono_le_petit_prince_the_business_man.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Lamplighter', `${ATF}hirono_le_petit_prince_The_Lamplighter.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Geographer', `${ATF}hirono_le_petit_prince_The_Geographer.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Snake', `${ATF}hirono_le_petit_prince_The_Snake.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Fox', `${ATF}hirono_le_petit_prince_The_Fox.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Switchman', `${ATF}hirono_le_petit_prince_The_Switchman.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Merchant', `${ATF}hirono_le_petit_prince_The_Merchant.jpg`),
  hfig(H_LE_PETIT_PRINCE_ID, 'The Pilot', `${ATF}hirono_le_petit_prince_The_Pilot.jpg`, 'secret'),

  // Echo (2025)
  hfig(H_ECHO_ID, 'Pieces of Memory', `${ATF}Popmart_Hirono_Echo_Series_Pieces_of_Memory.jpg`),
  hfig(H_ECHO_ID, 'Back Off', `${ATF}Popmart_Hirono_Echo_Series_Back_Off.jpg`),
  hfig(H_ECHO_ID, 'Caught You', `${ATF}Popmart_Hirono_Echo_Series_Caught_You.jpg`),
  hfig(H_ECHO_ID, 'Staying Up', `${ATF}Popmart_Hirono_Echo_Series_Staying_Up.jpg`),
  hfig(H_ECHO_ID, 'Daydreaming', `${ATF}Popmart_Hirono_Echo_Series_Daydreaming.jpg`),
  hfig(H_ECHO_ID, 'Knight', `${ATF}Popmart_Hirono_Echo_Series_Knight.jpg`),
  hfig(H_ECHO_ID, 'Journey in the Rain', `${ATF}Popmart_Hirono_Echo_Series_Journey_in_the_Rain.jpg`),
  hfig(H_ECHO_ID, 'Soul Connection', `${ATF}Popmart_Hirono_Echo_Series_Soul_Connection.jpg`),
  hfig(H_ECHO_ID, 'Eaten', `${ATF}Popmart_Hirono_Echo_Series_Eaten.jpg`),
  hfig(H_ECHO_ID, 'Get Lucky', `${ATF}Popmart_Hirono_Echo_Series_Get_Lucky.jpg`),
  hfig(H_ECHO_ID, 'Breakout Plan', `${ATF}Popmart_Hirono_Echo_Series_Breakout_Plan.jpg`),
  hfig(H_ECHO_ID, 'Hiding Behind You', `${ATF}Popmart_Hirono_Echo_Series_Hiding_Behind_You.jpg`),
  hfig(H_ECHO_ID, 'Never Growing Up', `${ATF}Popmart_Hirono_Echo_Series_Never_Growing_Up_Secret.jpg`, 'secret'),

  // Monsters' Carnival (2026)
  hfig(H_MONSTERS_ID, 'Grim Reaper', `${ATF}Popmart_Hirono_Monsters_Carnival_Series_Grim_Reaper.jpg`),
  hfig(H_MONSTERS_ID, 'Doctor Beak', `${ATF}Popmart_Hirono_Monsters_Carnival_Series_Doctor_Beak.jpg`),
  hfig(H_MONSTERS_ID, 'Killer Bunny', `${ATF}Popmart_Hirono_Monsters_Carnival_Series_Killer_Bunny.jpg`),
  hfig(H_MONSTERS_ID, 'Zombie', `${ATF}Popmart_Hirono_Monsters_Carnival_Series_Zombie.jpg`),
  hfig(H_MONSTERS_ID, 'Vampire', `${ATF}Popmart_Hirono_Monsters_Carnival_Series_Vampire.jpg`),
  hfig(H_MONSTERS_ID, 'Creepy Clown', `${ATF}Popmart_Hirono_Monsters_Carnival_Series_Creepy_Clown.jpg`),
  hfig(H_MONSTERS_ID, 'The Disembodied', `${ATF}Popmart_Hirono_Monsters_Carnival_Series_The_Disembodied_Secret.jpg`, 'secret'),
];

export const SMISKI_BRAND_ID_EXPORT = SMISKI_BRAND_ID;
export const HIRONO_BRAND_ID_EXPORT = HIRONO_BRAND_ID;

export const DEFAULT_STATE: AppState = {
  brands: [
    { id: SMISKI_BRAND_ID, name: 'Smiski', emoji: '🌿', sortOrder: 0 },
    { id: HIRONO_BRAND_ID, name: 'Hirono', emoji: '🖤', sortOrder: 1 },
  ],
  series: [
    // --- Smiski ---
    { id: S1_ID, brandId: SMISKI_BRAND_ID, name: 'Series 1', releaseYear: 2016, totalInSeries: 6, color: '#B4D4C4', sortOrder: 0, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2016/03/series1_img.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/12/smiski.com_product_icon01_v2.png' },
    { id: S2_ID, brandId: SMISKI_BRAND_ID, name: 'Series 2', releaseYear: 2016, totalInSeries: 6, color: '#89CFF0', sortOrder: 1, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2016/03/series2_img.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_icon02.png' },
    { id: S3_ID, brandId: SMISKI_BRAND_ID, name: 'Series 3', releaseYear: 2016, totalInSeries: 6, color: '#C3AED6', sortOrder: 2, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2016/09/series3_img-1.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_icon03.png' },
    { id: S4_ID, brandId: SMISKI_BRAND_ID, name: 'Series 4', releaseYear: 2017, totalInSeries: 6, color: '#F5D7A1', sortOrder: 3, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2017/02/series3_img.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_icon04.png' },
    { id: LIVING_ID, brandId: SMISKI_BRAND_ID, name: 'Living', releaseYear: 2018, totalInSeries: 6, color: '#E8A0BF', sortOrder: 4, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2018/08/image.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_iconliving.png' },
    { id: BATH_ID, brandId: SMISKI_BRAND_ID, name: 'Bath', releaseYear: 2017, totalInSeries: 6, color: '#89CFF0', sortOrder: 5, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2017/10/bath_img.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2023/09/smiski.com_product_iconbath.png' },
    { id: TOILET_ID, brandId: SMISKI_BRAND_ID, name: 'Toilet', releaseYear: 2017, totalInSeries: 6, color: '#F5D7A1', sortOrder: 6, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2017/10/toilet_img.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2023/06/smiski.com_product_icontoilet.png' },
    { id: BED_ID, brandId: SMISKI_BRAND_ID, name: 'Bed', releaseYear: 2019, totalInSeries: 6, color: '#C3AED6', sortOrder: 7, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2019/07/banner_bed_specialpage-1.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_iconbed.png' },
    { id: YOGA_ID, brandId: SMISKI_BRAND_ID, name: 'Yoga', releaseYear: 2019, totalInSeries: 6, color: '#B4D4C4', sortOrder: 8, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2019/09/smiski-yoga-banner_e-s.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_iconyoga.png' },
    { id: CHEER_ID, brandId: SMISKI_BRAND_ID, name: 'Cheer', releaseYear: 2020, totalInSeries: 6, color: '#FFB347', sortOrder: 9, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2020/12/cheer_top.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_iconcheer.png' },
    { id: MUSEUM_ID, brandId: SMISKI_BRAND_ID, name: 'Museum', releaseYear: 2020, totalInSeries: 6, color: '#E8A0BF', sortOrder: 10, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2020/12/smiski-museum-banner-s.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_iconmuseum.png' },
    { id: WORK_ID, brandId: SMISKI_BRAND_ID, name: '@Work', releaseYear: 2022, totalInSeries: 6, color: '#89CFF0', sortOrder: 11, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2022/02/img_work_top.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2022/11/smiski.com_product_iconatwork.png' },
    { id: DRESSING_ID, brandId: SMISKI_BRAND_ID, name: 'Dressing', releaseYear: 2022, totalInSeries: 6, color: '#F3CDE0', sortOrder: 12, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2022/10/img_dressing_top-300x220.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2023/05/dressing_series_icon.png' },
    { id: EXERCISING_ID, brandId: SMISKI_BRAND_ID, name: 'Exercising', releaseYear: 2023, totalInSeries: 6, color: '#FFB347', sortOrder: 13, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2023/05/exercise_top.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2024/01/Exercising_Series_icon.png' },
    { id: MOVING_ID, brandId: SMISKI_BRAND_ID, name: 'Moving', releaseYear: 2024, totalInSeries: 6, color: '#B4D4C4', sortOrder: 14, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2024/01/moving_top.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2024/09/smiski.com_product_icon.png' },
    { id: HIPPERS_ID, brandId: SMISKI_BRAND_ID, name: 'Hippers', releaseYear: 2024, totalInSeries: 6, color: '#C3AED6', sortOrder: 15, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2024/09/smiski_hippers_banner02.jpg', tabIconUrl: 'https://smiski.com/wp-content/uploads/2026/01/smiski.com_product_icon_hippers.png' },
    { id: SUNDAY_ID, brandId: SMISKI_BRAND_ID, name: 'Sunday', releaseYear: 2025, totalInSeries: 6, color: '#F5D7A1', sortOrder: 16, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2025/02/sunday-top.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2026/01/smiski.com_product_icon_sunday.png' },
    { id: BIRTHDAY_ID, brandId: SMISKI_BRAND_ID, name: 'Birthday', releaseYear: 2025, totalInSeries: 6, color: '#E8A0BF', sortOrder: 17, artworkUrl: 'https://smiski.com/e/wp-content/uploads/2025/09/birthday-top.png', tabIconUrl: 'https://smiski.com/wp-content/uploads/2025/09/smiski.com_product_icon_birthday.png' },
    // --- Hirono ---
    { id: H_OTHER_ONE_ID, brandId: HIRONO_BRAND_ID, name: 'The Other One', releaseYear: 2021, totalInSeries: 13, color: '#2D2D2D', sortOrder: 0 },
    { id: H_LITTLE_MISCHIEF_ID, brandId: HIRONO_BRAND_ID, name: 'Little Mischief', releaseYear: 2022, totalInSeries: 13, color: '#5C4033', sortOrder: 1 },
    { id: H_MIME_ID, brandId: HIRONO_BRAND_ID, name: 'Mime', releaseYear: 2023, totalInSeries: 13, color: '#6B4E71', sortOrder: 2 },
    { id: H_RESHAPE_ID, brandId: HIRONO_BRAND_ID, name: 'Reshape', releaseYear: 2023, totalInSeries: 10, color: '#8B6914', sortOrder: 3 },
    { id: H_SHELTER_ID, brandId: HIRONO_BRAND_ID, name: 'Shelter', releaseYear: 2024, totalInSeries: 13, color: '#4A6741', sortOrder: 4 },
    { id: H_LE_PETIT_PRINCE_ID, brandId: HIRONO_BRAND_ID, name: 'Le Petit Prince', releaseYear: 2024, totalInSeries: 13, color: '#C4A35A', sortOrder: 5 },
    { id: H_ECHO_ID, brandId: HIRONO_BRAND_ID, name: 'Echo', releaseYear: 2025, totalInSeries: 13, color: '#4A6B8A', sortOrder: 6 },
    { id: H_MONSTERS_ID, brandId: HIRONO_BRAND_ID, name: "Monsters' Carnival", releaseYear: 2026, totalInSeries: 7, color: '#8B0000', sortOrder: 7 },
  ],
  figurines: [...SMISKI_FIGURINES, ...HIRONO_FIGURINES],
  settings: {
    theme: 'light',
    viewMode: 'grid',
  },
  _version: 5,
};
