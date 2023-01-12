<template>
  <Page id="page-about">
    <PageHeader
       id="go-nl-header"
       title="Genome of the Netherlands"
       subtitle="About the GoNL Project"
       height="medium"
       titlePositionX="center"
       titlePositionY="center"
    />
    <PageSection id="about-consortium" :verticalPadding="2" aria-labelledby="about-consortium-title">
      <h2 id="about-consortium-title">The GoNL Consortium</h2>
      <p>The Genome of the Netherlands (GoNL) is a consortium funded as part of the Netherlands Biobanking and Biomolecular Research Infrastructure (<a title="BBMRI-NL" href="http://www.bbmri.nl">BBMRI-NL</a>). The work is done by the <a href="http://www.umcg.nl/EN/corporate/pages/default.aspx">UMCG</a>, <a href="http://www.lumc.nl/home/?setlanguage=English&amp;setcountry=en">LUMC</a>, <a href="http://www.erasmusmc.nl/?lang=en">Erasmus MC</a>, <a href="http://www.psy.vu.nl/nl/over-de-faculteit/medewerkers-alfabetisch/medewerkers-a-b/d-boomsma/index.asp">VU university</a> and <a href="http://www.umcutrecht.nl/zorg/">UMCU</a>, led by Professor Cisca Wijmenga. Samples where contributed by <a title="LifeLines" href="http://lifelines.nl/lifelines-research/general">LifeLines</a>, <a href="http://www.healthy-ageing.nl">The Leiden Longevity Study</a>, <a href="http://www.tweelingenregister.org">The Netherlands Twin Registry</a> (NTR), <a href="http://www.erasmus-epidemiology.nl/rotterdamstudy">The Rotterdam studies</a>, and <a href="http://www.epib.nl/research/geneticepi/research.html#gip">The Genetic Research in Isolated Populations program</a>. All the sequencing work is done by <a href="http://www.bgisequence.com/">BGI Hong Kong</a>. All the sequencing work is done by <a href="http://www.bgisequence.com/">BGI Hong Kong</a>.</p>
      <ConsortiumLogos />
    </PageSection>
    <PageSection id="about-participants" :verticalPadding="2" aria-labelledby="about-participants-title">
      <h2 id="about-participants-title">GoNL Participants</h2>
      <p>The individuals and organisations participated in the GoNL project.</p>
      <h3>Steering Committee</h3>
      <ul>
        <li>Cisca Wijmenga (PI)</li>
        <li>Morris Swertz</li>
        <li>P. Eline Slagboom</li>
        <li>Gertjan B. van Ommen</li>
        <li>Cornelia M. van Duijn</li>
        <li>Jasper A. Bovenberg (ELSI)</li>
        <li>Dorret I. Boomsma</li>
        <li>Paul I.W. de Bakker</li>
      </ul>
      <h3>Biobanks and Sample Management</h3>
      <ul>
        <li><span style="text-decoration: underline;">Leiden Longevity Study</span>: Marian Beekman, Anton J.M. de Craen, P. Eline Slagboom, H. Eka D. Suchiman</li>
        <li><span style="text-decoration: underline;">Netherlands Twin Register</span>: Dorret I. Boomsma, Gonneke Willemsen</li>
        <li><span style="text-decoration: underline;">LifeLines Cohort Study</span>: Behrooz Z. Alizadeh, Paul I.W. de Bakker, H. Marike Boezen, Pim van der Harst, Gerjan Navis, Marianne Rots, Salome Scholtens, Harold Snieder, Ronald P. Stolk, Morris Swertz, Bruce H.R. Wolffenbuttel, Cisca Wijmenga</li>
        <li><span style="text-decoration: underline;">Rotterdam and Erasmus Rucphen Studies</span>: Cornelia M. van Duijn, Albert Hofman, Aaron Isaacs, Ben Oostra, Fernando Rivadeneira, Andre G. Uitterlinden</li>
      </ul>
      <h3>Sequencing</h3>
      <ul>
        <li><span style="text-decoration: underline;">BGI</span>: Qibin Li, Yingrui Li, Yuanping Du, Ruoyan Chen, Hongzhi Cao, Ning Li, Sujie Cao, Jun Wang</li>
        <li><span style="text-decoration: underline;">Pfizer</span>: Steven J. Pitts, Shobha Potluri, Purnima Sundar, David R. Cox</li>
      </ul>
      <h3>Analysis</h3>
      <ul>
        <li><span style="text-decoration: underline;">University Medical Center Utrecht</span>: Paul I.W. de Bakker (Co-Chair), Laurent C. Francioli, Sara L. Pulit, Androniki Menelaou, Clara C. Elbers, Jessica van Setten, Jan H. Veldink, Leonard H. van den Berg, Wigard P. Kloosterman, Isaäc J. Nijman, Ivo Renkens</li>
        <li><span style="text-decoration: underline;">University Medical Center Groningen</span>: Morris Swertz (Co-Chair), Freerk van Dijk, Pieter B.T. Neerincx, Patrick Deelen, Alexandros Kanterakis, Martijn Dijkstra, Heorhiy Byelas, K. Joeri van der Velde, Victor Guryev</li>
        <li><span style="text-decoration: underline;">Leiden University Medical Center</span>: Kai Ye, Eric-Wubbo Lameijer, Martijn Vermaat, Jeroen F.J. Laros, Johan T. den Dunnen, Peter de Knijff</li>
        <li><span style="text-decoration: underline;">Erasmus MC University Medical Center Rotterdam</span>: Vyacheslav Koval, Lennart C. Karssen, Karol Estrada, Elisabeth M. van Leeuwen, Carolina Medina-Gomez, Najaf Amin, Mannis van Oven, Manfred Kayser</li>
        <li><span style="text-decoration: underline;">VU University Amsterdam</span>: Jouke-Jan Hottenga, Matthijs Kattenberg, Abdel Abdellaoui</li>
        <li><span style="text-decoration: underline;">Radboud University </span><span style="text-decoration: underline;">Nijmegen </span><span style="text-decoration: underline;">Medical Center</span>: Jayne Y. Hehir-Kwa, Joep de Ligt</li>
        <li><span style="text-decoration: underline;">Netherlands Bioinformatics Centre</span>: David van Enckevort, Hailiang Mei</li>
        <li><span style="text-decoration: underline;">Centrum Wiskunde &amp; Informatica</span>: Tobias Marschall, Alexander Schönhuth</li>
        <li><span style="text-decoration: underline;">Academic Medical Center Amsterdam</span>: Barbera D.C. van Schaik</li>
        <li><span style="text-decoration: underline;">SurfSARA</span>: Jan Bot</li>
      </ul>
      <h3>Collaborators</h3>
      <ul>
        <li><span style="text-decoration: underline;">Broad Institute of Harvard and MIT</span>: Shamil R. Sunyaev, Adam Kiezun, Paz Polak, Mashaal Sohail, Dana Vuzman, David Reich, Steven A. McCarroll, Robert E. Handsaker, Mark A. Depristo, Eric Banks, Ryan Poplin, Kiran Garimella</li>
        <li><span style="text-decoration: underline;">Columbia University</span>: Itsik Pe'er, Pier Francesco Palamara</li>
        <li><span style="text-decoration: underline;">Max Planck Institute for Evolutionary Anthropology</span>: Mingkun Li, Mark Stoneking</li>
        <li><span style="text-decoration: underline;">University of Washington at Seattle</span>: Evan E. Eichler, Fereydoun Hormozdiari</li>
        <li><span style="text-decoration: underline;">University of Pennsylvania at Philadelphia</span>: Benjamin F. Voight</li>
      </ul>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'
import ConsortiumLogos from '../components/ConsortiumLogos.vue';

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    ConsortiumLogos,
    AppFooter
  }
}
</script>
