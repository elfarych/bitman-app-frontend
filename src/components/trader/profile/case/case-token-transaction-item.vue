<template>
<div class="case-token-transaction-item">
  <div>
    <div class="f-w-800">
      <small class="f-w-400 text-grey-5">{{ $dayjs(order.date).format('DD.MM.YYYY') }}</small>
    </div>

    <div class="flex items-center justify-between no-wrap">
      <div class="flex items-center">
        <div
          class="f-w-600 rounded-borders text-center small-text"
          :class="order.fix_order ? 'bg-negative' : 'bg-positive'"
          style="padding: 3px 5px 2px; width: 70px"
        >
          {{ order.fix_order ? 'Sell' : 'Buy' }}
        </div>

        <div class="f-w-600 q-ml-sm fontsize-12">
          {{ order.quantity_base_asset }} {{ order.symbol }}
        </div>

        <div class="f-w-600 q-ml-sm fontsize-12">
          <small class="f-w-400 text-grey-5">price: </small>
          {{ order.price }}$
        </div>
      </div>

      <div>
        <q-btn
          icon="delete_forever"
          size="sm"
          dense flat unelevated
          @click="deleteDialog = true"
        />
      </div>
    </div>
  </div>

  <!--    Case delete dialog-->
  <q-dialog v-model="deleteDialog" persistent>
    <q-card style="width: 555px; max-width: 100%">
      <q-toolbar>
        <q-toolbar-title class="text-subtitle1 f-w-600">Delete transaction?</q-toolbar-title>
        <q-btn icon="close" dense flat v-close-popup/>
      </q-toolbar>

      <q-card-actions align="right">
        <q-btn
          icon="delete_forever"
          label="Delete"
          color="negative"
          no-caps
          unelevated
          outline
          :loading="deleteOrderLoading"
          @click="orderDelete"
        />

        <q-btn
          label="Cancel"
          no-caps
          unelevated
          flat
          class="q-ml-md"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'case-token-transaction-item',
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      deleteDialog: false,
      deleteOrderLoading: false
    }
  },
  methods: {
    ...mapActions('traderCase', ['deleteCaseTokenOrder']),
    async orderDelete () {
      this.deleteOrderLoading = true
      await this.deleteCaseTokenOrder(this.order.id)
      this.deleteOrderLoading = false
      this.deleteDialog = false
    },
    profitFormatter (profit) {
      return this.$numeral(profit).format('(0,0.00)$').replace('(', '-').replace(')', '')
    }
  }
}
</script>

<style scoped>

</style>
