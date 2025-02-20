<script setup lang="ts">

import { useUserStore } from '@/stores/user'

const userInfo = useUserStore().userInfo

</script>

<template>
  <li class="v-popover-wrap header-avatar-wrap">
    <div class="header-avatar-wrap--container mini-avatar--small">
      <a
        href="//space.bilibili.com/472980323"
        target="_blank"
        class="header-entry-mini"
      >
        <picture class="v-img">
          <source srcset="//i0.hdslb.com/bfs/face/5738c58cb8a8d3717f6cd8545bd5e1eda37e17c1.jpg@120w_120h_1c.avif" type="image/avif" />
          <source srcset="//i0.hdslb.com/bfs/face/5738c58cb8a8d3717f6cd8545bd5e1eda37e17c1.jpg@120w_120h_1c.webp" type="image/webp" />
          <img src="//i0.hdslb.com/bfs/face/5738c58cb8a8d3717f6cd8545bd5e1eda37e17c1.jpg@120w_120h_1c" alt="" loading="lazy" />
        </picture>
      </a>
      <a
        href="//space.bilibili.com/472980323"
        target="_blank"
        class="header-entry-avatar"
      >
        <div
          class="pili-avatar"
          style="width: 82px; height: 82px; transform: translate(0px, 0px)"
        >
          <img class="pili-avatar-img pili-avatar-face pili-avatar-img-radius"
            src="//i0.hdslb.com/bfs/face/5738c58cb8a8d3717f6cd8545bd5e1eda37e17c1.jpg@240w_240h_1c_1s_!web-avatar-nav.avif"
            alt=""
          />
          <span class="pili-avatar-icon pili-avatar-right-icon pili-avatar-icon-big-vip pili-avatar-size-82" ></span>
        </div>
      </a>
    </div>
    <div class="v-popover is-bottom" v-show="true"
      style="padding-top: 12px; margin-left: -12px;"
    >
      <div class="v-popover-content avatar-popover">
        <div class="avatar-panel-popover">
          <a class="big-avatar"></a>
          <a
            class="nickname-item light"
            :href="`/space/${userInfo.uid.value}`"
            target="_blank"
            style="color: rgb(251, 114, 153)"
          >
            {{ userInfo.nickname }}
          </a>
          <div class="vip-item">
            <a
              class="vip-item__label"
              href="//account.bilibili.com/big"
              target="_blank"
              style="width: 69px; height: 20px"
            >
              <picture class="v-img">
                <source srcset="//i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png@800w_40h_0e.avif" type="image/avif" />
                <source srcset="//i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png@800w_40h_0e.webp" type="image/webp" />
                <img src="//i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png@800w_40h_0e" alt="" loading="lazy" />
              </picture>
            </a>
            <div class="v-popover-wrap">
              <div class="senior-info">
                <a
                  href="//account.bilibili.com/account/record?type=exp"
                  target="_blank"
                  class="level-max"
                >
                  <svg
                    t="1641783513987"
                    class="icon"
                    viewBox="0 0 1901 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3313"
                    width="200"
                    height="200"
                  >
                    <path d="M154.916571 184.758857h1609.142858v707.364572h-1609.142858z" fill="#FFFFFF" p-id="3314"/>
                    <path class="level-bg" d="M1779.565714 93.037714c22.674286 0 45.421714 20.772571 44.324572 43.300572l-0.877715 6.144v747.446857c0 22.454857-15.36 44.909714-41.472 48.859428l-8.118857 0.585143H144.603429a48.859429 48.859429 0 0 1-49.005715-41.325714l-0.585143-8.118857V228.937143c0-22.454857 15.36-44.909714 41.398858-48.786286l8.192-0.585143h1021.805714v-37.083428c0-22.454857 15.36-44.909714 41.398857-48.786286l8.118857-0.658286h563.565714z m-92.891428 105.033143h-383.926857c-16.457143 0-32.914286 14.628571-36.425143 30.939429l-0.658286 6.144v574.464c0 16.457143 14.628571 32.914286 30.939429 36.425143l6.144 0.658285h384c16.530286 0 32.987429-14.628571 36.498285-30.939428l0.658286-6.144V494.592c0-16.530286-14.628571-32.914286-31.012571-36.425143l-6.144-0.658286h-297.179429V321.609143h297.179429c16.530286 0 32.987429-14.628571 36.498285-30.939429l0.658286-6.144v-49.371428c0-18.578286-18.578286-37.083429-37.156571-37.083429zM733.110857 284.598857h-49.590857c-18.578286 0-37.156571 18.505143-37.156571 37.010286v302.738286c0 16.749714 0 31.817143 6.217142 37.010285l173.348572 172.909715c7.899429 7.899429 23.259429 10.752 33.426286 11.849142l9.947428 0.585143 8.557714-0.438857c10.093714-0.950857 26.550857-3.657143 34.816-11.995428l185.782858-172.909715c4.973714-4.900571 5.997714-13.824 6.144-23.478857V327.68c0-18.505143-18.505143-37.010286-37.083429-37.010286h-49.517714c-18.651429 0-37.156571 18.505143-37.156572 37.083429v277.942857l-105.325714 104.96-105.325714-104.96V321.609143c0-18.505143-18.505143-37.010286-37.083429-37.010286z m-445.952 0h-49.517714c-16.530286 0-33.060571 14.628571-36.571429 30.866286l-0.585143 6.144v488.009143c0 16.530286 14.628571 32.914286 30.939429 36.425143l6.217143 0.658285h297.252571c16.530286 0 32.987429-14.628571 36.498286-30.939428l0.658286-6.144v-49.371429c0-16.603429-14.628571-32.987429-31.012572-36.425143l-6.144-0.658285H324.242286v-401.554286c0-18.505143-18.578286-37.010286-37.156572-37.010286z m1312.914286 296.448v142.116572h-210.505143V581.046857h210.505143z"
                      fill="#FF0000" p-id="3315"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="coins-item">
            <a href="//account.bilibili.com/site/coin" target="_blank">
              <span class="coin-item__text">硬币:</span>
              <span class="coin-item__num">{{}}</span>
            </a>
            <a href="//pay.bilibili.com/pay-v2-web/bcoin_index" target="_blank">
              <span class="coin-item__text">P币:</span>
              <span class="coin-item__num">0</span>
            </a>
            <div class="coin-animation" v-show="false"></div>
          </div>
          <!---->
          <div class="counts-item">
            <a
              class="single-count-item"
              href="//space.bilibili.com/472980323/fans/follow"
              target="_blank"
            ><div class="count-num">0</div>
              <div class="count-text">关注</div></a
            ><a
            class="single-count-item"
            href="//space.bilibili.com/472980323/fans/fans"
            target="_blank"
          ><div class="count-num">0</div>
            <div class="count-text">粉丝</div></a
          ><a
            class="single-count-item"
            href="//space.bilibili.com/472980323/dynamic"
            target="_blank"
          ><div class="count-num">0</div>
            <div class="count-text">动态</div></a
          >
          </div>
          <div
            data-v-e732fea6=""
            class="vip-entry-container"
            style="
            background-image: url('//i0.hdslb.com/bfs/activity-plat/static/20240724/e803d998c2d355f34ad8c36a6a729045/eAwhtOhoSo.png');
          "
          >
            <div data-v-e732fea6="" class="vip-entry-desc">
              <p
                data-v-e732fea6=""
                class="vip-entry-desc-title"
                style="color: rgb(255, 102, 153)"
              >
                尊贵的大会员
              </p>
              <p
                data-v-e732fea6=""
                class="vip-entry-desc-subtitle"
                style="color: rgb(97, 102, 109)"
              >
                戳我查看福利
              </p>
            </div>
            <div
              data-v-e732fea6=""
              class="vip-entry-btn"
              style="color: rgb(255, 102, 153); background: rgb(255, 255, 255)"
            >
              会员中心
            </div>
          </div>
          <div class="links-item">
            <a
              href="https://account.bilibili.com/account/home"
              class="single-link-item"
              target="_blank"
            ><div class="link-title">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="link-icon"
              >
                <rect opacity="0.01" width="18" height="18" fill="white"></rect>
                <path
                  d="M12.1146 9.48983C13.2763 8.63331 14.0299 7.2548 14.0299 5.7035C14.0299 3.11005 11.9198 1 9.32636 1C6.73291 1 4.62286 3.11005 4.62286 5.7035C4.62286 7.2548 5.37829 8.63331 6.53808 9.48983C3.87662 10.589 2 13.2118 2 16.2648C2 16.671 2.32901 17 2.73521 17C3.14141 17 3.47042 16.671 3.47042 16.2648C3.47042 13.0335 6.09879 10.407 9.3282 10.407C12.5576 10.407 15.186 13.0354 15.186 16.2648C15.186 16.671 15.515 17 15.9212 17C16.3274 17 16.6564 16.671 16.6564 16.2648C16.6546 13.2118 14.7761 10.589 12.1146 9.48983ZM6.09144 5.7035C6.09144 3.91878 7.54348 2.46858 9.32636 2.46858C11.1092 2.46858 12.5613 3.92062 12.5613 5.7035C12.5613 7.48639 11.1092 8.93843 9.32636 8.93843C7.54348 8.93843 6.09144 7.48639 6.09144 5.7035Z"
                  fill="var(--text2)"
                ></path></svg
              ><span>个人中心</span
            ><!---->
            </div>
              <svg
                width="10"
                height="10"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="link-icon--right"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.50588 3.40623C7.40825 3.3086 7.24996 3.3086 7.15232 3.40623L4.41244 6.14612L1.67255 3.40623C1.57491 3.3086 1.41662 3.3086 1.31899 3.40623C1.22136 3.50386 1.22136 3.66215 1.31899 3.75978L4.11781 6.5586C4.28053 6.72132 4.54434 6.72132 4.70706 6.5586L7.50588 3.75978C7.60351 3.66215 7.60351 3.50386 7.50588 3.40623Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M7.15232 3.40623L7.50588 3.75978L7.50588 3.75978L7.15232 3.40623ZM7.50588 3.40623L7.15232 3.75978L7.15233 3.75978L7.50588 3.40623ZM4.41244 6.14612L4.05888 6.49967C4.15265 6.59344 4.27983 6.64612 4.41244 6.64612C4.54504 6.64612 4.67222 6.59344 4.76599 6.49967L4.41244 6.14612ZM1.67255 3.40623L2.0261 3.05268L2.0261 3.05268L1.67255 3.40623ZM1.31899 3.40623L0.965439 3.05268L0.965439 3.05268L1.31899 3.40623ZM1.31899 3.75978L1.67255 3.40623V3.40623L1.31899 3.75978ZM4.11781 6.5586L3.76425 6.91215L4.11781 6.5586ZM4.70706 6.5586L4.35351 6.20505L4.70706 6.5586ZM7.50588 3.75978L7.15233 3.40623L7.15232 3.40623L7.50588 3.75978ZM7.50588 3.75978C7.40825 3.85742 7.24996 3.85742 7.15232 3.75978L7.85943 3.05268C7.56654 2.75978 7.09166 2.75978 6.79877 3.05268L7.50588 3.75978ZM4.76599 6.49967L7.50588 3.75978L6.79877 3.05268L4.05888 5.79257L4.76599 6.49967ZM1.31899 3.75978L4.05888 6.49967L4.76599 5.79257L2.0261 3.05268L1.31899 3.75978ZM1.67254 3.75979C1.57491 3.85742 1.41662 3.85742 1.31899 3.75979L2.0261 3.05268C1.73321 2.75978 1.25833 2.75978 0.965439 3.05268L1.67254 3.75979ZM1.67255 3.40623C1.77018 3.50386 1.77018 3.66215 1.67255 3.75978L0.965439 3.05268C0.672546 3.34557 0.672546 3.82044 0.965439 4.11334L1.67255 3.40623ZM4.47136 6.20505L1.67255 3.40623L0.965439 4.11334L3.76425 6.91215L4.47136 6.20505ZM4.35351 6.20505C4.38605 6.1725 4.43882 6.1725 4.47136 6.20505L3.76425 6.91215C4.12223 7.27013 4.70264 7.27013 5.06062 6.91215L4.35351 6.20505ZM7.15232 3.40623L4.35351 6.20505L5.06062 6.91215L7.85943 4.11334L7.15232 3.40623ZM7.15233 3.75978C7.05469 3.66215 7.05469 3.50386 7.15233 3.40623L7.85943 4.11334C8.15233 3.82045 8.15233 3.34557 7.85943 3.05268L7.15233 3.75978Z"
                  fill="currentColor"
                ></path></svg></a
            ><a
            href="https://member.bilibili.com/v2#/upload-manager/article"
            class="single-link-item"
            target="_blank"
          ><div class="link-title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="link-icon"
            >
              <rect
                opacity="0.01"
                width="18"
                height="18"
                fill="#C4C4C4"
              ></rect>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.375 1.875H10.875C12.739 1.875 14.25 3.38604 14.25 5.25V7.875V8.625C14.25 9.03921 14.5858 9.375 15 9.375C15.4142 9.375 15.75 9.03921 15.75 8.625V7.875V5.25C15.75 2.55761 13.5674 0.375 10.875 0.375H3.375C2.33947 0.375 1.5 1.21447 1.5 2.25V15C1.5 16.0355 2.33947 16.875 3.375 16.875H6.75H7.5C7.91421 16.875 8.25 16.5392 8.25 16.125C8.25 15.7108 7.91421 15.375 7.5 15.375H6.75H3.375C3.16789 15.375 3 15.2071 3 15V2.25C3 2.04289 3.16789 1.875 3.375 1.875ZM10.4 8.51962C10.8 8.28868 10.8 7.71132 10.4 7.48038L7.7 5.92154C7.3 5.6906 6.8 5.97927 6.8 6.44115V9.55885C6.8 10.0207 7.3 10.3094 7.7 10.0785L10.4 8.51962ZM15.518 14.2511L14.3215 16.3234H11.9285L10.7321 14.2511L11.9285 12.1787H14.3215L15.518 14.2511ZM16.817 13.5011C17.0849 13.9652 17.0849 14.537 16.817 15.0011L15.6205 17.0734C15.3526 17.5375 14.8574 17.8234 14.3215 17.8234H11.9285C11.3926 17.8234 10.8974 17.5375 10.6295 17.0734L9.43302 15.0011C9.16507 14.537 9.16507 13.9652 9.43302 13.5011L10.6295 11.4287C10.8974 10.9646 11.3926 10.6787 11.9285 10.6787H14.3215C14.8574 10.6787 15.3526 10.9646 15.6205 11.4287L16.817 13.5011ZM13.125 13.3125C12.6072 13.3125 12.1875 13.7322 12.1875 14.25C12.1875 14.7678 12.6072 15.1875 13.125 15.1875C13.6428 15.1875 14.0625 14.7678 14.0625 14.25C14.0625 13.7322 13.6428 13.3125 13.125 13.3125Z"
                fill="var(--text2)"
              ></path></svg
            ><span>投稿管理</span
          ><!---->
          </div>
            <svg
              width="10"
              height="10"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="link-icon--right"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.50588 3.40623C7.40825 3.3086 7.24996 3.3086 7.15232 3.40623L4.41244 6.14612L1.67255 3.40623C1.57491 3.3086 1.41662 3.3086 1.31899 3.40623C1.22136 3.50386 1.22136 3.66215 1.31899 3.75978L4.11781 6.5586C4.28053 6.72132 4.54434 6.72132 4.70706 6.5586L7.50588 3.75978C7.60351 3.66215 7.60351 3.50386 7.50588 3.40623Z"
                fill="currentColor"
              ></path>
              <path
                d="M7.15232 3.40623L7.50588 3.75978L7.50588 3.75978L7.15232 3.40623ZM7.50588 3.40623L7.15232 3.75978L7.15233 3.75978L7.50588 3.40623ZM4.41244 6.14612L4.05888 6.49967C4.15265 6.59344 4.27983 6.64612 4.41244 6.64612C4.54504 6.64612 4.67222 6.59344 4.76599 6.49967L4.41244 6.14612ZM1.67255 3.40623L2.0261 3.05268L2.0261 3.05268L1.67255 3.40623ZM1.31899 3.40623L0.965439 3.05268L0.965439 3.05268L1.31899 3.40623ZM1.31899 3.75978L1.67255 3.40623V3.40623L1.31899 3.75978ZM4.11781 6.5586L3.76425 6.91215L4.11781 6.5586ZM4.70706 6.5586L4.35351 6.20505L4.70706 6.5586ZM7.50588 3.75978L7.15233 3.40623L7.15232 3.40623L7.50588 3.75978ZM7.50588 3.75978C7.40825 3.85742 7.24996 3.85742 7.15232 3.75978L7.85943 3.05268C7.56654 2.75978 7.09166 2.75978 6.79877 3.05268L7.50588 3.75978ZM4.76599 6.49967L7.50588 3.75978L6.79877 3.05268L4.05888 5.79257L4.76599 6.49967ZM1.31899 3.75978L4.05888 6.49967L4.76599 5.79257L2.0261 3.05268L1.31899 3.75978ZM1.67254 3.75979C1.57491 3.85742 1.41662 3.85742 1.31899 3.75979L2.0261 3.05268C1.73321 2.75978 1.25833 2.75978 0.965439 3.05268L1.67254 3.75979ZM1.67255 3.40623C1.77018 3.50386 1.77018 3.66215 1.67255 3.75978L0.965439 3.05268C0.672546 3.34557 0.672546 3.82044 0.965439 4.11334L1.67255 3.40623ZM4.47136 6.20505L1.67255 3.40623L0.965439 4.11334L3.76425 6.91215L4.47136 6.20505ZM4.35351 6.20505C4.38605 6.1725 4.43882 6.1725 4.47136 6.20505L3.76425 6.91215C4.12223 7.27013 4.70264 7.27013 5.06062 6.91215L4.35351 6.20505ZM7.15232 3.40623L4.35351 6.20505L5.06062 6.91215L7.85943 4.11334L7.15232 3.40623ZM7.15233 3.75978C7.05469 3.66215 7.05469 3.50386 7.15233 3.40623L7.85943 4.11334C8.15233 3.82045 8.15233 3.34557 7.85943 3.05268L7.15233 3.75978Z"
                fill="currentColor"
              ></path></svg
            ></a>
            <div class="v-popover-wrap">
              <a class="single-link-item" target="_blank"
              ><div class="link-title">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="link-icon"
                >
                  <path
                    d="M7.76269 1.80538C8.3585 0.936022 9.6415 0.936021 10.2373 1.80538L11.8725 4.19132C12.0675 4.47592 12.3547 4.68457 12.6857 4.78213L15.4601 5.59999C16.4711 5.89799 16.8675 7.11819 16.2248 7.95349L14.461 10.2459C14.2506 10.5194 14.1409 10.857 14.1504 11.2019L14.2299 14.0933C14.2589 15.1468 13.2209 15.901 12.2279 15.5478L9.50257 14.5787C9.1775 14.4631 8.82251 14.4631 8.49743 14.5787L5.77211 15.5478C4.7791 15.901 3.74113 15.1468 3.77011 14.0933L3.84963 11.2019C3.85912 10.857 3.74942 10.5194 3.53902 10.2459L1.77516 7.95349C1.13247 7.11819 1.52893 5.89799 2.53986 5.59999L5.31432 4.78213C5.64526 4.68457 5.93246 4.47592 6.1275 4.19132L7.76269 1.80538Z"
                    stroke="var(--text2)"
                    stroke-width="1.6"
                  ></path>
                  <path
                    d="M8.64131 6.72679C8.78803 6.4295 9.21197 6.4295 9.35869 6.72679L9.78861 7.5979C9.84687 7.71595 9.9595 7.79778 10.0898 7.81671L11.0511 7.9564C11.3792 8.00408 11.5102 8.40726 11.2728 8.63868L10.5772 9.31674C10.4829 9.40863 10.4399 9.54103 10.4621 9.67079L10.6263 10.6282C10.6824 10.955 10.3394 11.2042 10.046 11.0499L9.18614 10.5979C9.06961 10.5366 8.93039 10.5366 8.81386 10.5979L7.95403 11.0499C7.66058 11.2042 7.31761 10.955 7.37365 10.6282L7.53787 9.67079C7.56012 9.54103 7.5171 9.40863 7.42283 9.31674L6.72721 8.63868C6.4898 8.40727 6.62081 8.00408 6.9489 7.9564L7.91022 7.81671C8.0405 7.79778 8.15313 7.71596 8.21139 7.5979L8.64131 6.72679Z"
                    fill="var(--text2)"
                  ></path></svg
                ><span>推荐服务</span
              ><!---->
              </div>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="link-icon--right"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.50588 3.40623C7.40825 3.3086 7.24996 3.3086 7.15232 3.40623L4.41244 6.14612L1.67255 3.40623C1.57491 3.3086 1.41662 3.3086 1.31899 3.40623C1.22136 3.50386 1.22136 3.66215 1.31899 3.75978L4.11781 6.5586C4.28053 6.72132 4.54434 6.72132 4.70706 6.5586L7.50588 3.75978C7.60351 3.66215 7.60351 3.50386 7.50588 3.40623Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M7.15232 3.40623L7.50588 3.75978L7.50588 3.75978L7.15232 3.40623ZM7.50588 3.40623L7.15232 3.75978L7.15233 3.75978L7.50588 3.40623ZM4.41244 6.14612L4.05888 6.49967C4.15265 6.59344 4.27983 6.64612 4.41244 6.64612C4.54504 6.64612 4.67222 6.59344 4.76599 6.49967L4.41244 6.14612ZM1.67255 3.40623L2.0261 3.05268L2.0261 3.05268L1.67255 3.40623ZM1.31899 3.40623L0.965439 3.05268L0.965439 3.05268L1.31899 3.40623ZM1.31899 3.75978L1.67255 3.40623V3.40623L1.31899 3.75978ZM4.11781 6.5586L3.76425 6.91215L4.11781 6.5586ZM4.70706 6.5586L4.35351 6.20505L4.70706 6.5586ZM7.50588 3.75978L7.15233 3.40623L7.15232 3.40623L7.50588 3.75978ZM7.50588 3.75978C7.40825 3.85742 7.24996 3.85742 7.15232 3.75978L7.85943 3.05268C7.56654 2.75978 7.09166 2.75978 6.79877 3.05268L7.50588 3.75978ZM4.76599 6.49967L7.50588 3.75978L6.79877 3.05268L4.05888 5.79257L4.76599 6.49967ZM1.31899 3.75978L4.05888 6.49967L4.76599 5.79257L2.0261 3.05268L1.31899 3.75978ZM1.67254 3.75979C1.57491 3.85742 1.41662 3.85742 1.31899 3.75979L2.0261 3.05268C1.73321 2.75978 1.25833 2.75978 0.965439 3.05268L1.67254 3.75979ZM1.67255 3.40623C1.77018 3.50386 1.77018 3.66215 1.67255 3.75978L0.965439 3.05268C0.672546 3.34557 0.672546 3.82044 0.965439 4.11334L1.67255 3.40623ZM4.47136 6.20505L1.67255 3.40623L0.965439 4.11334L3.76425 6.91215L4.47136 6.20505ZM4.35351 6.20505C4.38605 6.1725 4.43882 6.1725 4.47136 6.20505L3.76425 6.91215C4.12223 7.27013 4.70264 7.27013 5.06062 6.91215L4.35351 6.20505ZM7.15232 3.40623L4.35351 6.20505L5.06062 6.91215L7.85943 4.11334L7.15232 3.40623ZM7.15233 3.75978C7.05469 3.66215 7.05469 3.50386 7.15233 3.40623L7.85943 4.11334C8.15233 3.82045 8.15233 3.34557 7.85943 3.05268L7.15233 3.75978Z"
                    fill="currentColor"
                  ></path></svg></a
              ><!---->
            </div>
          </div>
          <div class="split-line"></div>
          <!---->
          <div class="logout-item">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="link-icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.6137 9.30115C17.6932 9.10837 17.6932 8.89282 17.6137 8.70004C17.5743 8.60393 17.5165 8.51726 17.4443 8.44504L15.2221 6.22282C14.9148 5.9156 14.4176 5.91615 14.111 6.22282C13.8043 6.52948 13.8037 7.02671 14.111 7.33393L14.9921 8.21504L7.99985 8.21504C7.56596 8.21448 7.21429 8.56615 7.21429 9.00059C7.21429 9.21726 7.30207 9.41393 7.44429 9.55615C7.58651 9.69837 7.78318 9.78615 7.99985 9.78615L14.9921 9.78615L14.111 10.6673C13.8043 10.9739 13.8037 11.4712 14.111 11.7784C14.4182 12.0856 14.9154 12.085 15.2221 11.7784L17.4443 9.55615C17.5165 9.48393 17.5743 9.39726 17.6137 9.30115"
                fill="var(--text2)"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.8889 5.11111C9.74127 2.96349 6.25873 2.96349 4.11111 5.11111C1.96349 7.25873 1.96349 10.7413 4.11111 12.8889C6.25873 15.0365 9.74127 15.0365 11.8889 12.8889C12.1957 12.5821 12.6932 12.5821 13 12.8889C13.3068 13.1957 13.3068 13.6932 13 14C10.2387 16.7613 5.76127 16.7613 3 14C0.238731 11.2387 0.23873 6.76127 3 4C5.76127 1.23873 10.2387 1.23873 13 4C13.3068 4.30683 13.3068 4.80429 13 5.11111C12.6932 5.41794 12.1957 5.41794 11.8889 5.11111Z"
                fill="var(--text2)"
              ></path></svg
            ><span>退出登录</span>
          </div>
        </div>
      </div>
    </div>
  </li>

</template>

<style scoped>
.v-popover-wrap {
  position: relative;
}
.pili-header .header-avatar-wrap {
  position: relative;
  box-sizing: content-box;
  padding-right: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.pili-header .header-avatar-wrap .header-avatar-wrap--container {
  position: relative;
  z-index: 2;
}

@keyframes fadeOut {
  0% {
    opacity: 1
  }
  to {
    opacity: 0
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0
  }
  to {
    opacity: 1
  }
}
@keyframes avatarFadeLarge {
  0% {
    opacity: 0;
    transform: scale(.4) translateY(-2px) translate(3px)
  }
  30% {
    opacity: 1
  }
  to {
    opacity: 1;
    transform: scale(1) translate(-36px,10px)
  }
}
@keyframes avatarFadeSmall {
  0% {
    transform: scale(1) translate(-36px,10px)
  }
  60% {
    opacity: 1
  }
  to {
    opacity: 0;
    transform: scale(.4) translateY(-2px) translate(3px)
  }
}
.pili-header .header-entry-mini {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 2;
  display: block;
  width: 38px;
  height: 38px;
  border-radius: 50%;
}
.pili-header .mini-avatar--small .header-entry-mini {
  animation: fadeIn .6s both;
}
.v-img {
  position: relative;
  display: inline-block;
  line-height: 1;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background-color: var(--graph_bg_regular);
}
.pili-header .header-entry-mini .v-img {
  border-radius: 50%;
  background-color: transparent;
}
.v-img img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: inherit;
}
.pili-header .header-entry-mini .v-img>img {
  border: 2px solid #fff;
  border-radius: 50%;
  image-rendering: -webkit-optimize-contrast;
}
.pili-header .header-entry-avatar {
  position: absolute;
  top: 5px;
  left: 10px;
  z-index: 2;
  display: block;
  border-radius: 50%;
  transform-origin: top left;
}
.pili-header .mini-avatar--small .header-entry-avatar {
  animation: avatarFadeSmall .35s both;
}
.pili-header .mini-avatar--large .header-entry-avatar {
  animation: avatarFadeLarge .35s both;
}
.pili-avatar {
  display: block;
  position: relative;
  background-image: url(data:image/gif;base64,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);
  background-size: cover;
  border-radius: 50%;
  margin: 0;
  padding: 0;
}
.pili-header .header-avatar-wrap .header-avatar-wrap--container .pili-avatar {
  box-sizing: content-box;
  border: 2px solid #fff;
}
.pili-avatar * {
  margin: 0;
  padding: 0;
}
.pili-avatar-face {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  width: 100%;
  height: 100%;
}
.pili-avatar-img {
  border: none;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
  image-rendering: -webkit-optimize-contrast;
}
.pili-avatar-img-radius {
  border-radius: 50%;
}
.pili-header .pili-avatar-img {
  transform: translateZ(0);
  will-change: transform;
}
.pili-header .pili-avatar-face {
  top: 0;
  left: 0;
}
.pili-avatar-icon-big-vip {
  background-image: url(//i0.hdslb.com/bfs/seed/jinkela/short/user-avatar/big-vip.svg);
}
.pili-avatar-right-icon {
  width: 27.5%;
  height: 27.5%;
  position: absolute;
  right: 0;
  bottom: -1px;
  background-size: cover;
  image-rendering: -webkit-optimize-contrast;
}

.v-popover {
  position: absolute;
  transition: 0.3s;
  z-index: 1;
}
.v-popover.is-bottom-start {
  top: 100%;
  left: 0;
}
.v-popover.is-bottom {
  top: 100%;
  left: 50%;
}
.v-popover.is-top,
.v-popover.is-bottom {
  transform: translate3d(-50%,0,0);
}
.v-popover-content {
  position: relative;
  background-color: var(--bg1_float);
  box-shadow: 0 0 30px rgba(0,0,0,.1);
  border-radius: 8px;
  border: 1px solid var(--line_regular);
  color: var(--text1);
}
.pili-header .avatar-panel-popover {
  padding: 0 24px 18px;
  width: 300px;
  border-radius: 8px;
  background-color: var(--bg1_float);
}
.pili-header .avatar-panel-popover .big-avatar {
  display: block;
  margin-bottom: 4px;
  width: 80px;
  height: 80px;
  opacity: 0;
}
.pili-header .avatar-panel-popover .nickname-item {
  display: block;
  text-align: center;
  margin-top: -40px;
  margin-bottom: 2px;
  font-size: 18px;
}
.pili-header .avatar-panel-popover .nickname-item,
.pili-header .avatar-panel-popover .vip-item .level-max,
.pili-header .avatar-panel-popover .level-item .level-item__bar--tag>span,
.pili-header .avatar-panel-popover .counts-item .single-count-item .count-num,
.pili-header .avatar-panel-popover .links-item .single-link-item,
.pili-header .avatar-panel-popover .logout-item,
.pili-header .level-intro-popover .level-intro__content--title,
.history-panel-popover .header-tabs-panel__content--date,
.history-panel-popover .header-history-card__info--title,
.dynamic-panel-popover .header-tabs-panel__content--date {
  font-family: PingFang SC,HarmonyOS_Medium,Helvetica Neue,Microsoft YaHei,sans-serif;
  font-weight: 500;
}
.pili-header .avatar-panel-popover .vip-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
}
.pili-header .avatar-panel-popover .vip-item__label {
  display: flex;
  height: 20px;
  width: auto;
}
.pili-header .avatar-panel-popover .vip-item__label .v-img {
  background-color: transparent;
  object-fit: contain;
}
.pili-header .avatar-panel-popover .vip-item .senior-info {
  display: flex;
  align-items: center;
}
.pili-header .avatar-panel-popover .coins-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  font-size: 12px;
}
.pili-header .avatar-panel-popover .coins-item .coin-item__text {
  display: inline-block;
  margin-right: 5px;
  color: var(--text3);
}
.pili-header .avatar-panel-popover .coins-item .coin-item__num {
  display: inline-block;
  margin-right: 10px;
  color: var(--text1);
}
.pili-header .avatar-panel-popover .coin-animation {
  position: absolute;
  bottom: -10px;
  left: 90px;
  width: 50px;
  height: 105px;
}
.pili-header .avatar-panel-popover .counts-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 20px;
}
.pili-header .avatar-panel-popover .counts-item .single-count-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: color .2s;
}
.pili-header .avatar-panel-popover .counts-item .single-count-item .count-text {
  color: var(--text3);
  font-weight: 400;
  font-size: 12px;
  transition: color .2s;
}
.vip-entry-container {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 9px 12px;
  border-radius: 6px;
  background-size: cover;
  transition: background-color .2s;
}
.vip-entry-desc-title {
  font-family: PingFang SC,HarmonyOS_Medium,Helvetica Neue,Microsoft YaHei,sans-serif;
  font-weight: 500;
}
.vip-entry-desc-title {
  color: var(--Pi5_u);
  font-size: 14px;
  line-height: 20px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word!important;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 1;
}
.vip-entry-desc-subtitle {
  margin-top: 1px;
  font-size: 12px;
  line-height: 17px;
  font-weight: 400;
  color: var(--Ga7_u);
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word!important;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 1;
}
.vip-entry-btn {
  padding: 6px 0;
  margin-left: 8px;
  width: 68px;
  line-height: 17px;
  font-size: 12px;
  text-align: center;
  background: var(--Wh0_u);
  border-radius: 6px;
  color: var(--Pi5_u);
  background-size: cover;
  white-space: nowrap;
  flex-shrink: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-overflow: -o-ellipsis-lastline;
  text-overflow: ellipsis;
  word-break: break-word!important;
  word-break: break-all;
  line-break: anywhere;
  -webkit-line-clamp: 1;
}
.pili-header .avatar-panel-popover .links-item .single-link-item .link-title {
  display: flex;
  align-items: center;
}
.pili-header .avatar-panel-popover .links-item .single-link-item .link-title .link-icon {
  margin-right: 16px;
}
.pili-header .avatar-panel-popover .links-item .single-link-item .link-icon--right {
  transform: rotate(-90deg);
}
.pili-header .avatar-panel-popover .split-line {
  margin: 10px 0;
  width: 100%;
  height: 1px;
  background: var(--line_regular);
}
.pili-header .avatar-panel-popover .logout-item svg {
  width: unset;
  height: unset;
}
.pili-header .avatar-panel-popover .logout-item .link-icon {
  margin-right: 16px;
}


</style>
