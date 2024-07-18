<template>
  <el-main>
    <el-row :gutter="20">
      <el-col>
        <div>
          <el-carousel trigger="click" height="878px">
            <el-carousel-item v-for="item in 6" :key="item"> </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2>面臨現狀</h2>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <img src="../assets/面臨現狀1.jpg" />
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <div class="text-center">
          <p>
            2005 年，一項由全球 1360 位專家合作調查的「千禧年生態系統評估」（Millennium
            EcosystemAssesement，簡稱MA）
            指出，人類的各種生產活動，已將地球逼至大規模物種滅絕的邊緣，而這種生態系統的變化，正在反過來危害人類的基本福祉，
            包括食物與乾淨飲水的取得，阻礙人類遏止貧窮、飢餓等困境的努力。舉例來說，密集工業生產所排放的大量溫室氣體造成氣候暖化，
            導致極圈的冰層消融、海平面上升，影響特定生物的生存、山林植被的分布區域，再接續影響與人類息息相關的食物鏈與淨水功能；
            又例如對水災調適有重大貢獻的濕地、沼澤等近海生態系，若遭破壞，逢極端天災（如颶風、暴量降雨）來襲時，缺乏承受過度衝擊的能力，
            移轉到人類身上的負面後果將更為巨大。報告更指出，當生物多樣性喪失、生態系服務（ecosystem
            services）下降，而威脅生命安全，
            無法充分滿足生存必需要素時，人們的社會關係、文化傳統、互助連帶等價值，也有被摧毀的危險。可以說，生活在地球生態系統，沒有人是局外人，
            除非往其他星球尋找生存可能。距今不過 13
            年前完成的這份報告，如今看來並非危言聳聽，類似的例子在國際與臺灣，都非罕見：2017
            年橫掃加勒比海與美國南方的颶風艾瑪（Hurricane Irma）、 臺灣 2009 年的莫拉克風災、2016
            年尼伯特風災等，因為生態系統承受天災的韌性不足，造成嚴重人財家園損失，尤其社經地位較弱勢的人們，更首當其衝。
          </p>
        </div>
      </el-col>
      <el-col :span="24" :xs="24">
        <h3>經濟損失</h3>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <el-card>
          <template #header>
            <div class="card-header" style="text-align: center">
              <span>農業方面損失</span>
            </div>
          </template>
          <p>
            一項2004年的調查發現，1979年首度引進臺灣的福壽螺，短短25年間已造成51億元的農業經濟損失，若加上政府與農民每年投入的防治費用，損失金額更直逼100億元。
          </p>
          <p>
            農民每年每公頃投入防治福壽螺的金額平均約2,100元，若不採取任何防治措施，每年每公頃平均損失將高達2.3萬元;當防治措施沒有做好時，福壽螺危害臺灣農業生態環境所造成的無形損失為新臺幣51億元。
          </p>
          <template #footer
            ><img src="../assets/農業方面損失.jpg" /> <img src="../assets/農業方面損失2.jpeg"
          /></template>
        </el-card>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <el-card>
          <template #header>
            <div class="card-header" style="text-align: center">
              <span>公共設施方面損失</span>
            </div>
          </template>
          <p>
            入侵紅火蟻常被發現在電氣設備內築巢，像是電錶、變電箱、電纜線箱等，因為來自南美溫暖大草原的入侵紅火蟻喜歡溫暖的環境，電路設備的內部溫度偏高，恰巧是陰暗的密閉空間，正好成為入侵紅火蟻築巢的最佳選擇。
          </p>
          <p>
            而在電氣設備中的入侵紅火蟻經常會咬壞電線，造成電線設備的短路及損壞，除了維護上的成本外，就連清除成本也是一筆不小的開銷，每年造成的經濟損失非常之可觀。
          </p>
          <template #footer
            ><img src="../assets/公共設施方面損失.png" />
            <img src="../assets/公共設施方面損失2.png"
          /></template>
        </el-card>
      </el-col>
      <el-col :span="24" :xs="24">
        <h3>病媒傳播</h3>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <el-card>
          <template #header>
            <div class="card-header" style="text-align: center">
              <span>大鼠</span>
            </div>
          </template>
          <p>
            鼠類因為生活習性的關係，長期活動於較骯髒且容易受汙染的場所，如：水溝、地下道、菜市場…等地方，因此身上帶原傳染病的機會高上許多！
          </p>
          <p>
            透過老鼠作為媒介的疾病包括：漢他病毒、拉薩病毒、沙狀病毒、鼠疫、鼠咬熱、沙門氏桿菌、鉤端螺旋體、地方性斑疹傷寒、弓蟲、焦蟲、包膜絛蟲、阿米巴原蟲…等。
          </p>
          <template #footer
            ><img src="../assets/老鼠.png" /> <img src="../assets/老鼠2.png"
          /></template>
        </el-card>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <el-card>
          <template #header>
            <div class="card-header" style="text-align: center">
              <span>大鼠</span>
            </div>
          </template>
          <p>
            鼠類因為生活習性的關係，長期活動於較骯髒且容易受汙染的場所，如：水溝、地下道、菜市場…等地方，因此身上帶原傳染病的機會高上許多！
          </p>
          <p>
            透過老鼠作為媒介的疾病包括：漢他病毒、拉薩病毒、沙狀病毒、鼠疫、鼠咬熱、沙門氏桿菌、鉤端螺旋體、地方性斑疹傷寒、弓蟲、焦蟲、包膜絛蟲、阿米巴原蟲…等。
          </p>
          <template #footer
            ><img src="../assets/老鼠.png" /> <img src="../assets/老鼠2.png"
          /></template>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'MainContent'
}
</script>

<style scoped>
h2 {
  text-align: center;
  color: #ff372e;
  font-size: 40px;
}

h3 {
  text-align: center;
  color: #2ed64b;
  font-size: 30px;
}

img {
  max-width: 100%;
  height: auto;
}

.el-carousel__item:nth-child(1) {
  background: url('../assets/福壽螺.png') no-repeat center;
  background-size: 80% 100%;
}

.el-carousel__item:nth-child(2) {
  background: url('../assets/入侵紅火蟻.png') no-repeat center;
  background-size: 80% 100%;
}

.el-carousel__item:nth-child(3) {
  background: url('../assets/中國梨木蝨.png') no-repeat center;
  background-size: 80% 100%;
}

.el-carousel__item:nth-child(4) {
  background: url('../assets/河殼菜蛤.png') no-repeat center;
  background-size: 80% 100%;
}

.el-carousel__item:nth-child(5) {
  background: url('../assets/緬甸小鼠.png') no-repeat center;
  background-size: 80% 100%;
}

.el-carousel__item:nth-child(6) {
  background: url('../assets/多線南蜥.png') no-repeat center;
  background-size: 80% 100%;
}

/* PC版樣式 */
@media (min-width: 769px) {
  .el-main {
    padding: 2em;
  }
}
</style>
