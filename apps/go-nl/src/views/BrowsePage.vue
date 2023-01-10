<template>
  <Page id="page-home">
    <PageHeader
       id="go-nl-header"
       title="Genome of the Netherlands"
       subtitle="Request data"
       height="medium"
    />
    <PageSection id="section-intro">
      <h2>Browse Data</h2>
      <form id="browse-data">
        <legend>Browse Data</legend>
        <p>Search counts of alternative alleles and genotypes.</p>
				<label for="chromosome">Select a chromosome</label>
				<select id="chromosome">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
					<option>8</option>
					<option>9</option>
					<option>10</option>
					<option>11</option>
					<option>12</option>
					<option>13</option>
					<option>14</option>
					<option>15</option>
					<option>16</option>
					<option>17</option>
					<option>18</option>
					<option>19</option>
					<option>20</option>
					<option>21</option>
					<option>22</option>
				</select>
      
        <div>
          <label for="start">Start position</label>
          <input type="number" id="start" class="form-control" />
          <span id="start-help-none" class="help-block" style="display:none">
            Please specify the start position
          </span>
          <span id="start-help-negative" class="help-block" style="display:none">
            Smalles position possible is 0
          </span>
        </div>
        <div>
          <label for="stop" class="control-label">Stop position</label>
          <input type="number" id="stop" class="form-control" />
          <span id="stop-help-none" class="help-block" style="display:none">
            Please specify the stop position
          </span>
          <span id="stop-help-too-big" class="help-block" style="display:none">
            Stop position exceeds max chromosome position of ~249,000,000
          </span>
          <span id="stop-help-smaller-than-start" class="help-block" style="display:none">
            Stop position should be bigger than start position
          </span>
        </div>
        
        <ButtonSearch />
        <!-- <button type="submit" class="btn btn-default btn-primary" id="search">
          <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
          Search
        </button> -->

      </form>
    </PageSection>
  </Page>
  <AppFooter />
</template>

<script>
import { Page, PageHeader, PageSection, ButtonSearch } from 'rd-components'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: {
    Page,
    PageHeader,
    PageSection,
    ButtonSearch,
    AppFooter
  },
  data () {
    return {
      start: null,
      stop: null,
      chromosome: null,
    }
  },
  methods: {
    createUrl () {
      const baseUrl = '/menu/main/dataexplorer?'
      const entityParam = `entity=gonl_chr${this.chromosome}`
      const filterParam = `&filter=(POS=ge=${this.start};POS=le=${this.stop})`
      const options = '&hideselect=true&mod=data'
      return [baseUrl, entityParam, filterParam, options].join()
    },
    onclick () {
      
    }
  }
}

// $("#browse-data").on("submit", function(e) {
// 		e.preventDefault();
//         var chromosome = $('#chromosome').val();
//         var start = $('#start').val();
//         var stop = $('#stop').val();
//         $("#stop").removeClass("has-error");
//         $("#start-form").removeClass("has-error");
//         $(".help-block").css("display", "none");
//         if ((stop && start) && (Number(stop) > Number(start)) && Number(stop) < 249000000 && Number(start) > -1) {
//             window.location.replace(`/menu/main/dataexplorer?entity=gonl_chr${chromosome}&hideselect=true&mod=data&filter=(POS=ge=${start};POS=le=${stop})`);
//         } else if (start && !stop) {
//             $("#stop-form").addClass("has-error");
//             $("#stop-help-none").css("display", "inline");
//         } else if (stop && !start) {
//             $("#start-form").addClass("has-error");
//             $("#start-help-none").css("display", "inline");
//         } else if (Number(stop) > 250000000) {
//             $("#stop-form").addClass("has-error");
//             $("#stop-help-too-big").css("display", "inline");
//         } else if (Number(start) < 0) {
//             $("#start-form").addClass("has-error");
//             $("#start-help-negative").css("display", "inline");
//         } else if (Number(stop) < Number(start)) {
//             $("#start-form").addClass("has-error");
//             $("#stop-form").addClass("has-error");
//             $("#stop-help-smaller-than-start").css("display", "inline");
//         } else {
//             $("#stop-form").addClass("has-error");
//             $("#start-form").addClass("has-error");
//             $("#stop-help-none").css("display", "inline");
//             $("#start-help-none").css("display", "inline");
//         }
//     });

</script>

<style lang="scss">
</style>