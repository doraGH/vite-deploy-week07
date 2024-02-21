<template>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="d-flex justify-content-between mt-4">
      <h2>優惠卷列表</h2>
      <button class="btn btn-primary" @click="openProductModal('createNew')">
        建立新的優惠卷
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">名稱</th>
          <th>折扣百分比</th>
          <th width="120" class="text-center">到期日</th>
          <th width="120" class="text-center">是否啟用</th>
          <th width="120" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {

  },
};
</script>
