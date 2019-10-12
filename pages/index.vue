<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card flat color="background" max-width="600">
        <v-card-title primary-title>
          台風19号に備えてアイコンに養生テープを貼りましょう！
        </v-card-title>
        <v-img v-show="!twitterUser" :src="concept" />
        <div id="firebaseui-auth-container"></div>
        <v-card-text v-show="twitterUser">
          <div class="canvas__align-center">
            <canvas
              id="canvas"
              class="fix-scale"
              width="256"
              height="256"
            ></canvas>
            <img id="canvas-img" />
          </div>
          <div class="canvas__align-center">
            <v-btn width="200" class="mb-2" color="accent" @click="saveImage"
              >画像をダウンロード
            </v-btn>
            <a id="download_link"></a>
            <v-btn width="200" class="mb-2" color="primary" @click="singOut">
              ログアウトする
            </v-btn>
            <v-btn
              width="200"
              class="mb-2"
              color="primary"
              href="https://tenki.jp/bousai/typhoon/1919/"
            >
              台風の災害情報はこちら
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import * as firebaseui from 'firebaseui'
import firebase from 'firebase'
import { auth, authProviders } from '~/plugins/firebase'
import concept from '~/assets/images/concept.png'
import typhoonTape from '~/assets/images/typhoonTape.png'
export default {
  components: {},
  data() {
    return {
      concept,
      twitterUser: false,
      canvas: '',
      downloadLink: '',
      filename: 'typhoon_tape'
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.downloadLink = document.getElementById('download_link')
    auth.onAuthStateChanged((user) => {
      if (!user) {
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(auth)

        const config = {
          signInOptions: [authProviders.Twitter],
          callbacks: {
            // Nuxtのローカルサーバーで起こるCORSエラーのためこのように設定。本番環境では不要
            signInSuccessWithAuthResult: (authResult) => {
              window.location.href = '/'
              return false // falseを設定するとsignInSuccessUrlにはリダイレクトしない
            }
          },
          signInSuccessUrl: '/',
          signInFlow: 'popup' // ログインフロー設定。Nuxtのローカルサーバーで起こるCORSエラーがあるのでpopupがオススメです。
        }
        console.log('start UI')
        ui.start('#firebaseui-auth-container', config)
      } else {
        this.twitterUser = true
        this.generaetTyphoonTape(user)
      }
    })
  },
  methods: {
    generaetTyphoonTape(user) {
      console.log(this.canvas)
      const context = this.canvas.getContext('2d')
      const srcs = [user.photoURL.replace('_normal', ''), typhoonTape]
      const images = []
      for (const i in srcs) {
        images[i] = new Image()
        // これがめっちゃ重要。忘れると以下のエラーで保存できない
        //  DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
        images[i].crossOrigin = 'Anonymous'
        images[i].src = srcs[i]
      }
      let loadedCount = 1
      for (const i in images) {
        images[i].addEventListener(
          'load',
          async function() {
            if (loadedCount === images.length) {
              for (const j in images) {
                await context.drawImage(images[j], 0, 0, 256, 256)
              }
            }
            loadedCount++
          },
          false
        )
      }
      // document.getElementById('canvas-img').src = this.canvas.toDataURL()
      //   .setAttribute('src', this.canvas.toDataURL('image/png'))
    },
    saveImage() {
      // document.getElementById('canvas-img').src = this.canvas.toDataURL()
      if (this.canvas.msToBlob) {
        const blob = this.canvas.msToBlob()
        window.navigator.msSaveBlob(blob, this.filename)
      } else {
        this.downloadLink.href = this.canvas.toDataURL('image/png')
        this.downloadLink.download = this.filename
        this.downloadLink.click()
      }
    },
    singOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.twitterUser = false
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.canvas__align-center {
  text-align: center;
}
.fix-scale {
  transform: scale(0.75);
}
</style>
