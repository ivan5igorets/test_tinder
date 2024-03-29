<template>
  <div class="page">
    <SideBar v-on:restart="restart" :curBuyerId="curBuyerId" />

    <div class="main-part main-part-width" v-hammer:swipe="onSwipe">
      <div class="main-part-body">
        <div class="card-size">
          <transition :name="nameOfTransition">
            <Card 
              v-if="curBuyer"
              :buyer="curBuyer"
              :med="medicine"
            />
          </transition>
        </div>
      </div>

      <div class="main-part-footer">
        <button @click="next(1)" :disabled="medicine !== 0" class="medicine left">Препарат 1</button>
        <button @click="next(2)" :disabled="medicine !== 0" class="medicine center">Препарат 2</button>
        <button @click="next(3)" :disabled="medicine !== 0" class="medicine right">Препарат 3</button>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/card'
import SideBar from '../components/sideBar'
import {mapState, mapMutations} from 'vuex'

export default {
  components: {
    Card,
    SideBar
  },

  data() {
    return {
      curBuyerId: null,
      curBuyer: null,
      medicine: 0,
      nameOfTransition: 'first'
    }
  },

  mounted() {
    this.curBuyerId = 0
    this.curBuyer = this.buyers[this.curBuyerId]
  },

  methods: {
    onSwipe(event) {
      let res = event.deltaX < 0 ? 1 : 3
      const x = Math.abs(event.deltaX)
      const y = Math.abs(event.deltaY)

      res = x > y ? res : 2
      if (res === 2 && event.deltaY > 0) {
        return
      }
      this.next(res)
    },

    next(medicine) {
      this.INCRIMENT(medicine)
      this.chooseTransition(medicine)

      this.medicine = medicine;
      setTimeout(() => {
        this.curBuyer = null
        setTimeout(() => {
          this.medicine = 0
          if(this.curBuyerId === this.buyers.length - 1) {
            this.$router.push({name: 'Final'})
            return
          }
          this.curBuyerId++
          this.curBuyer = this.buyers[this.curBuyerId]
        }, 500)
      }, 500)
    },

    chooseTransition(med) {
      switch(med) {
        case 1:
          this.nameOfTransition = 'first'
          break
        case 2:
          this.nameOfTransition = 'second'
          break
        case 3:
          this.nameOfTransition = 'third'
          break
      }
    },

    goHome() {
      this.$router.push({name: 'Start'})
    },

    restart() {
      this.ON_START()
      this.curBuyerId = 0
      this.curBuyer = this.buyers[this.curBuyerId]
    },

    ...mapMutations({
      INCRIMENT: 'sales/INCRIMENT',
      ON_START: 'sales/ON_START'
    })
  },

  computed: {
    ...mapState('buyers',{
      buyers: state => state.buyers
    }),

    ...mapState('sales', {
      med_1: state => state.med_1,
      med_2: state => state.med_2,
      med_3: state => state.med_3,
    }),
  },

}
</script>

<style lang="scss" scoped>
.first-enter-active, .first-leave-active,
.second-enter-active, .second-leave-active,
.third-enter-active, .third-leave-active {
  transition: all .3s ease;
}
.first-enter,
.second-enter,
.third-enter {
  opacity: 0;
}

.first-leave-to  {
  opacity: 0;
  transform: translateX(-100%) rotate(-45deg);
}

.second-leave-to {
  opacity: 0;
  transform: translateY(-100%) rotate(-30deg);
}
.third-leave-to {
  opacity: 0;
  transform: translateX(100%) rotate(45deg);
}

.plug {
  height: 590px;
  width: 540px;
  opacity: 1;
}

.page {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
}


.main-part {
  @media screen and (min-width: 1101px) {
    &-width {
      width: calc(100% - 470px);
    }
  }

  @media screen and (max-width: 1100px) {
    &-width {
      width: calc(100% - 280px);
      margin: 15px auto;
    }
  }
  
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &-body {
    display: flex;
    margin: auto;
  }

  &-footer {
    margin-bottom: 55px;

    .medicine {
      width: 280px;
      height: 90px;
      border-radius: 45px;

      font-family: Avenir Next Cyr;
      font-size: 28px;
      line-height: 34px;
      margin: 10px;
      color: #FFFFFF;

      border: none;
      outline: none;
    }

    .left {
      background: linear-gradient(266.19deg, #8049C7 0%, #CA57FD 100%);

      &:hover {
        background: linear-gradient(266.19deg, #7040af 0%, #b14bdd 100%);
      }

      &:active {
        background: linear-gradient(266.19deg, #613797 0%, #8d3bb1 100%);
      }
    }

    .center {
      background: linear-gradient(266.19deg, #169AE4 0%, #0CC4FA 100%);

      &:hover {
        background: linear-gradient(266.19deg, #138bd1 0%, #0bafe0 100%);
      }
      
      &:active {
        background: linear-gradient(266.19deg, #106fa7 0%, #0990b9 100%);
      }
    }

    .right {
      background: linear-gradient(90deg, #FFD748 0.02%, rgba(195, 199, 11, 0.96) 99.97%, #CAC6AB 99.98%, #D3E9E1 99.99%);
      
      &:hover {
        background: linear-gradient(90deg, #ecc742 0.02%, rgba(177, 180, 10, 0.96) 99.97%, #b8b49c 99.98%, #b7cac3 99.99%);
      }
      
      &:active {
        background: linear-gradient(90deg, #d3b23a 0.02%, rgba(154, 156, 9, 0.96) 99.97%, #9b9784 99.98%, #9eafa9 99.99%);
      }
    }
  }
}
</style>