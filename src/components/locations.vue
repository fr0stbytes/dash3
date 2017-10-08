<template lang="html">
  <div>
    <div class="has-margin-5 container">
      <b-row class="has-border-bottom">
        <b-col xm="12" md="9">
          <h4>Locations</h4>
        </b-col>
        <b-col xm="12" md="3">
          <b-btn v-b-modal.modalAddLocation class="add-btn-simple shadow-2" variant="primary"><i class="fa fa-plus" aria-hidden="true"></i> </b-btn>
        </b-col>
      </b-row>
      <b-row class="has-margin-5">
        <b-col xm="12">
          <b-row>
            <b-col xm="12" md="4" v-for="location in locations" :key="location.id" v-cloak>
              <b-card class="shadow-1" border-variant="white">
                <h5>{{location.title.en}}</h5>
                <p v-bind:class="statusType(location.status)"><i class="fa fa-circle is-small" aria-hidden="true"></i> {{location.status}}</p>
                <b-card-footer class="is-right">
                  <b-btn variant="outline-success" v-if="location.status === 'draft'" size="sm" @click.stop="setLocationToPublic(location.id)">Make public</b-btn>
                  <b-btn variant="outline-warning" v-if="location.status === 'published'" size="sm"  @click.stop="setLocationToDraft(location.id)">Make draft</b-btn>
                  <b-button @click="onLocationPicked(location.slug.en)" size="sm" variant="primary">View</b-button>
                </b-card-footer>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <b-modal id="modalAddLocation" ref="modalAddLocation" title="Add new location" hide-footer>
      <form @submit.prevent="onCreateLocation">
        <b-form-group id="exampleInputGroup1"
                  label="Location:" label-for="exampleInput1" >
          <b-form-input id="exampleInput1" type="text" required v-model="titleEn"
                        placeholder="Enter location name" class="form-control"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                  label="Slug:" label-for="exampleInput2" >
          <b-form-input id="exampleInput2" type="text" required v-model="slugEn"
                        placeholder="Enter location slug" class="form-control"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="exampleInputGroup3"
                  label="Greek name:" label-for="exampleInput3" >
          <b-form-input id="exampleInput3" type="text" required v-model="titleGr"
                        placeholder="Name in Greek" class="form-control"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup4"
                  label="Greek slug:" label-for="exampleInput4" >
          <b-form-input id="exampleInput4" type="text" required v-model="slugGr"
                        placeholder="Slug in Greek" class="form-control"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="exampleInputGroup3"
                  label="Upload image:" >
           <b-form-file id="file_input2" v-model="imageUrl" choose-label="Attachment2" @change="onFilePicked"></b-form-file>
        </b-form-group>
        <div class="">
          <img :src="imageUrl">
        </div>
        <b-button type="submit" variant="primary" class="has-margin-2">Submit</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'locations',
  data () {
    return {
      isDanger: 'warning',
      isSuccess: 'success',
      titleEn: '',
      slugEn: '',
      id: '',
      status: '',
      titleGr: '',
      slugGr: '',
      image: '',
      imageUrl: '',
      selected: []
    }
  },
  methods: {
    onCreateLocation () {
      const locationData = {
        titleEn: this.titleEn,
        slugEn: this.slugEn,
        titleGr: this.titleGr,
        slugGr: this.slugGr,
        image: this.image,
        status: 'draft'
      }
      this.$store.dispatch('createLocation', locationData)
      this.$refs.modalAddLocation.hide()
      this.$data.titleEn = ''
      this.$data.slugEn = ''
      this.$data.titleGr = ''
      this.$data.slugGr = ''
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    onLocationPicked ($slug) {
      // const location = {
        // title: $slug
      // }
      // this.$store.dispatch('urlSlug', location)
      this.$router.push('/' + $slug)
    },
    statusType: function ($status) {
      if ($status === 'draft') {
        return this.isDanger
      } else {
        return this.isSuccess
      }
    },
    setLocationToPublic ($id) {
      const id = $id
      const status = 'published'
      this.$store.dispatch('statusToPublished', {
        id,
        status
      })
    },
    setLocationToDraft ($id) {
      const id = $id
      const status = 'draft'
      this.$store.dispatch('statusToDraft', {
        id,
        status
      })
    }
  },
  computed: {
    locations () {
      return this.$store.getters.loadedLocations
    }
  }
}
</script>

<style lang="scss" scoped>
  .success {
    color: #00ce6a;
  }
  .yellow-border {
    border-left: 5px solid #ffb85c
  }

  h4:hover {
    text-decoration: none;
  }

  [v-cloak] {
    display: none;
  }
</style>
