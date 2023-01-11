<template>
  <ul class="logos">
    <li class="logo">
      <a href="http://www.nbic.nl">
        <img
          alt="the netherlands bioinformatics centre"
          :src="logo_nbic"
          width="71"
          height="30"
        />
      </a>
    </li>
    <li class="logo">
      <a href="http://www.umcg.nl/EN/corporate/pages/default.aspx">
        <img
          alt="university medical centre groningen"
          :src="logo_umcg"
          width="132"
          height="70"
        />
      </a>
    </li>
    <li class="logo">
      <a href="https://www.bbmri.nl">
        <img
          alt="Biobanking and BioMedical Research Infrastructure, Netherlands"
          :src="logo_bmri"
          width="120"
          height="60"
        />
      </a>
    </li>
    <li class="logo">
      <a href="https://www.lumc.nl">
        <img
          alt="Leiden University Medical Center"
          :src="logo_lumc"
          width="70"
          height="70"
        />
      </a>
    </li>
    <li class="logo">
      <a href="https://www.umcutrecht.nl">
        <img
          alt="University Medical Center Utrecht"
          :src="logo_umcu"
          width="70"
          height="68"
        />
      </a>
    </li>
    <li class="logo">
      <a href="https://www.vu.nl/">
        <img
          alt="Vrije Universiteit Amsterdam"
          :src="logo_vumc"
          width="100"
          height="53"
        />
      </a>
    </li>
    <li class="logo">
      <a href="https://www.erasmusmc.nl">
        <img
          alt="Erasmus University Medical Center"
          :src="logo_eumc"
          width="100"
          height="40"
        />
      </a>
    </li>
    <li class="logo">
      <a href="http://www.genomics.cn/index">
        <img
          alt="BGI Group; Beijing Genomics Institute"
          :src="logo_bgi"
          width="144"
          height="37"
        />
      </a>
    </li>
  </ul>
</template>

<script>
import logo_bgi from '@/assets/logo_bgi.png'
import logo_bmri from '@/assets/logo_bmri.png'
import logo_eumc from '@/assets/logo_eumc.png'
import logo_lumc from '@/assets/logo_lumc.png'
import logo_nbic from '@/assets/logo_nbic.png'
import logo_umcg from '@/assets/logo_umcg.png'
import logo_umcu from '@/assets/logo_umcu.png'
import logo_vumc from '@/assets/logo_vumc.png'

export default {
  data () {
    return {
      logo_bgi: logo_bgi.png,
      logo_bmri: logo_bmri.png,
      logo_eumc: logo_eumc.png,
      logo_lumc: logo_lumc.png,
      logo_nbic: logo_nbic.png,
      logo_umcg: logo_umcg.png,
      logo_umcu: logo_umcu.png,
      logo_vumc: logo_vumc.png
    }
  }
}
</script>

<style lang="scss">
.logos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}
</style>