<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <div>
          <el-carousel trigger="click" height="100vh">
            <el-carousel-item v-for="item in items" :key="item.id">
              <img :src="item.image" alt="Carousel Image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2 id="condition">面臨現狀</h2>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <div data-aos="fade-right" data-aos-offset="500" data-aos-easing="ease-in-sine">
          <img src="../assets/面臨現狀.png" />
        </div>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <div
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="1000"
          data-aos-duration="3000"
        >
          <div style="font-size: 18px" class="text-center">
            <p>
              生物多樣性和生態系統服務政府間科學政策平台，簡稱IPBES，<br />
              是一個由不同國家的政府部門一同成立的國際機構。IPBES於2012年由94個成員國成立，目前共有近140個成員國。IPBES也與多個組織、民間團體、科學家、學術研究機構合作，<br />
              以當前已知與生物多樣性、生態系統對人類相關貢獻（如糧食生產）的最佳科學知識為基礎，提供決策者制定與實施相關政策可參考的科學評估。<br />
              根據IPBES與國際自然保育聯盟（IUCN）的定義：<br />
              1.外來入侵種：是指動物、植物或其他生命體，無論有意還是無意，被人為引入到非牠們原本自然棲息的環境，而且已經威脅到原生的生物多樣性、生態系統、糧食安全、人類的經濟、健康和福祉。<br />
              2.外來種：意思是指一個物種因為逃逸、引入或散播到不是牠原本自然分布的棲息環境中。但是外來種不一定都會對原生的生態造成負面影響，也不是所有外來種都有辦法在野外自行繁殖，<br />
              例如台灣的浣熊。若外來種在非原生的環境中可以自行繁衍，但還沒有擴大族群到威脅原生物種、或像入侵種影響生態的程度，可以稱為歸化種。<br />
              3.入侵種：指的是物種的生存擴大到已經對原生的生態系造成影響，如果這個造成負面影響的物種不是原本生態內的生物，就稱為「外來入侵種」。IPBES今年的報告指的主要是外來入侵種。<br />
              但是當地的原生物種也可能成為入侵種，當牠們數量增加或擴大族群範圍到變成有入侵性，且在特定的地區內威脅到原生物種的生存，會成為某個地區的入侵種，稱為「國內外來種」或「本土入侵種」。<br />
              例如，以台灣西北部棲地為主的白頭翁，因為被人為放生到花東地區，而影響當地的台灣特有種烏頭翁的生存，造成原生的純種烏頭翁數量銳減。<br />
              以台灣的情況，根據農業部2004年增修公告的優先防治、長期管理、觀察、監測或評估中之21種入侵種生物清單，<br />
              包含入侵種紅火蟻、蘇鐵白輪盾介殼蟲、小花蔓澤蘭、緬甸小鼠、松材線蟲、中國梨木蝨、福壽螺、河殼菜蛤、布袋蓮、多線南蜥、刺桐釉小蜂、<br />
              、香澤蘭、銀合歡、豬草、沙氏變色蜥、亞洲錦蛙、白尾八哥、輝椋鳥、琵琶鼠、魚虎、美洲螯蝦。台灣近期常常聽到的外來種生物，還有斑腿樹蛙、埃及聖䴉、綠鬣蜥、俗稱巴西龜的紅耳泥龜等。<br />
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
        <div data-aos="fade-right" data-aos-offset="500" data-aos-easing="ease-in-sine">
          <el-card id="card">
            <template #header>
              <div class="card-header" style="text-align: center">
                <h4>農業方面損失</h4>
              </div>
            </template>
            <p>
              1.一項2004年的調查發現，1979年首度引進臺灣的福壽螺，短短25年間已造成51億元的農業經濟損失，若加上政府與農民每年投入的防治費用，損失金額更直逼100億元。
            </p>
            <p>
              2.農民每年每公頃投入防治福壽螺的金額平均約2,100元，若不採取任何防治措施，每年每公頃平均損失將高達2.3萬元;當防治措施沒有做好時，福壽螺危害臺灣農業生態環境所造成的無形損失為新臺幣51億元。
            </p>
            <p>
              3.福壽螺的危害主要是在於牠們會吃掉農作物，尤其是稻田裡的稻米，這些稻米是農民的生計，如果被福壽螺吃掉，農民的收入就會受到影響。
            </p>
            <p>
              4.以米糠搭配陷阱誘捕福壽螺，雖然有效率，且對環境與生物較為友善，但對於像福壽螺這般環境適應力強、繁殖力又高的外來種而言，是治標不治本，因為不可能完全移除。
            </p>
            <template #footer>
              <div class="image-container">
                <img src="../assets/農業方面損失.jpg" /><img
                  src="../assets/農業方面損失3.png"
                /><img src="../assets/農業方面損失4.png" /><img
                  src="../assets/農業方面損失2.jpeg"
                /></div
            ></template>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
        <div data-aos="fade-left" data-aos-offset="500" data-aos-easing="ease-in-sine">
          <el-card id="card">
            <template #header>
              <div class="card-header" style="text-align: center">
                <h4>流浪貓狗帶來的問題</h4>
              </div>
            </template>
            <p>
              1.2022年3月14日，中央研究院建置的臺灣物種名錄，正式將犬貓更新為「外來入侵種」。而流浪犬貓亦有諮詢過相關學者，取得對野生動物的危害確認而更新。
            </p>
            <p>
              2.嘉義縣布袋鎮的豬舍及鵝場日前遭浪犬入侵，造成豬跟鵝大量傷亡，農民損失慘重。農民表示，浪犬入侵後，豬舍及鵝場內的豬跟鵝都受到驚嚇，有的嚇得亂竄，有的則是被咬傷，造成大量傷亡。
            </p>
            <p>
              3.浪犬造成農損，主要是因為牠們會破壞農作物，尤其是農民種植的蔬菜，雖然基本上浪犬不會去吃它們，但在上面踐踏就會使得農作物遭到破壞。
            </p>
            <p>
              4.弓形蟲病、貓蛔蟲和貓抓病是常見的貓咪危害人體疾病，其中弓形蟲病是一種由弓形蟲引起的傳染病，主要是由貓咪傳播給人類，而貓蛔蟲則是由貓咪的排泄物傳播給人類，貓抓病則是由貓咪的爪子傷口傳播給人類。
            </p>
            <template #footer>
              <div class="image-container">
                <img src="../assets/流浪貓狗帶來的問題.png" />
                <img src="../assets/流浪貓狗帶來的問題2.png" />
                <img src="../assets/流浪貓狗帶來的問題3.png" />
                <img src="../assets/流浪貓狗帶來的問題4.png" /></div
            ></template>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
        <div data-aos="fade-right" data-aos-offset="500" data-aos-easing="ease-in-sine">
          <el-card id="card">
            <template #header>
              <div class="card-header" style="text-align: center">
                <h4>虐殺外來種無法可管?</h4>
              </div>
            </template>
            <p>
              1.一隻隻中箭後綠鬣蜥任其逐漸死亡；一隻懷孕的綠鬣蜥受到驚嚇後試圖闖入民宅，身上有多處射擊傷口；一群幼年的綠鬣蜥跟鞭炮一起被膠帶綑綁著，遭殘忍虐殺。
            </p>
            <p>
              2.2021年3月台灣動物社會研究召開記者會，譴責農委會「嚴重失職，移除入侵動物毫無策略及人道規範，放任民眾虐殺動物」希望盡快制定相關規範，並調查懲處虐待行為。
            </p>
            <p>
              3.移除是不得不的做法，尤其虐待或拿來炫耀更是不可取，我們不鼓勵這樣的行為。變相的移除只會增加該生物的痛苦，我們應該要有更好的方法來處理這些問題。
            </p>
            <p>
              4.現況社會大眾對於外來入侵種根深蒂固的惡意，人們不認為移除需講求動物福利，而是以殺害為榮，這樣的觀念恐將會影響到下一代的價值觀。
            </p>
            <template #footer
              ><div class="image-container">
                <img src="../assets/虐殺外來種無法可管.png" />
                <img src="../assets/虐殺外來種無法可管2.png" />
                <img src="../assets/虐殺外來種無法可管3.png" />
                <img src="../assets/虐殺外來種無法可管4.png" /></div
            ></template>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
        <div data-aos="fade-left" data-aos-offset="500" data-aos-easing="ease-in-sine">
          <el-card id="card">
            <template #header>
              <div class="card-header" style="text-align: center">
                <h4>走私問題</h4>
              </div>
            </template>
            <p>
              1.澳洲小龍蝦就是最典型的養殖業者引進外來種逃逸到台灣本土環境的例子，這種小龍蝦在台灣的水域中繁殖，並且開始對當地的生態系統造成影響。
            </p>
            <p>
              2.2002年中國藍鵲疑因走私侵入台灣，作為外來種，因為族群擴大、棲地與食性相同，中國藍鵲已然成為台灣藍鵲的勁敵，對生態環境構成影響。
            </p>
            <p>
              3.魚虎遭人為走私後放入台灣水域，因在台灣的水域沒有天敵故大量繁殖。而魚虎作為肉食性魚類，會對台灣原生魚類造成極大危害。
            </p>
            <p>
              4.2011年5月苗栗縣政府農業處宣稱為增加生態資源，在縣境兩處號稱生態池的地方放流總共七百斤的美國牛蛙，原本應具備專業知識的農業處大開生態倒車的作法，造成不可逆的生態浩刧。
            </p>
            <template #footer
              ><div class="image-container">
                <img src="../assets/走私問題.png" /> <img src="../assets/走私問題2.jpg" />
                <img src="../assets/走私問題3.png" /><img src="../assets/走私問題4.png" /></div
            ></template>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
        <div data-aos="fade-right" data-aos-offset="500" data-aos-easing="ease-in-sine">
          <el-card id="card">
            <template #header>
              <div class="card-header" style="text-align: center">
                <h4>隨意餵食問題</h4>
              </div>
            </template>
            <p>
              1.野生台灣獼猴一但被人類餵食習慣後，會認為人類就是帶著食物的傢伙，這樣的行為會讓獼猴失去尋找食物的能力，嚴重依賴人類的食物並與人類爭搶食物，進而演變成人猴大戰。
            </p>
            <p>
              2.松鼠本以植物、果實為主食，但被人類餵食習慣後族群數量逐漸增加，超出了生態負荷。而松鼠平時有啃樹皮控制門牙長度的習慣，過多的松鼠將導致大量樹皮被啃食，導致樹木估死，進而影響生態平衡。
            </p>
            <p>
              3.竹雞是一種台灣低海拔山區常見之鳥類，幼鳥若長期與人接觸容易產生印痕現象，將人類誤以為是親鳥，導致容易被人類捕食，此外人類的食物也不適合鳥類進食，因餵食造成的物種聚集更容易導致傳染病的傳播。
            </p>
            <p>
              4.本來極少在人類面前現身的黃喉貂，近些年越來越常出現在人類面前，特別在玉山、太平山國家公園，民眾餵食的亂象頻頻發生，一但他們改變覓食習性，甚至主動向人乞食，也讓人擔憂是否會步入台灣獼猴後塵。
            </p>
            <template #footer
              ><div class="image-container">
                <img src="../assets/隨意餵食問題.png" />
                <img src="../assets/隨意餵食問題2.png" />
                <img src="../assets/隨意餵食問題3.png" />
                <img src="../assets/隨意餵食問題4.png" /></div
            ></template>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
        <div data-aos="fade-left" data-aos-offset="500" data-aos-easing="ease-in-sine">
          <el-card id="card">
            <template #header>
              <div class="card-header" style="text-align: center">
                <h4>棄養問題</h4>
              </div>
            </template>
            <p>
              1.台灣鴿子競賽賭金每年上看至少700億，使得萬隻鴿子年年在海上上演生死戰，時間內返回的賽鴿成為鴿主的心肝寶貝，繼續育種培養下一代比賽，未折返的鴿子則任其自生自滅，有些恐命喪大海，然後就算有幸回到岸上，也有可能因為輸了比賽鴿主直接折斷翅膀棄養，因而無法飛翔。
            </p>
            <p>
              2.宜蘭縣武荖坑有民眾發現大量疑遭到放生的斑龜，總數量可能超過2000隻。宜蘭縣政府2024年2月21日接獲通報，目前緊急救援235隻斑龜，有些已經被發現明顯死亡，報案民眾在武荖坑現場遇到一位年約7、80歲的老翁，研判有可能是老翁放生，由於距離事發已隔多日，目前也尚未聯繫到老翁，無從得知斑龜總量。
            </p>
            <p>
              3.2022年12月23日大量報導的嘉義東石出現獼猴抱小狗事件，然而東石之前並沒有猴子出沒的紀錄，研判是棄養的獼猴，雖然有對該小狗實施救援，但現場受到大批不支持救援的民眾阻撓，至2022年12月25日，被民眾發現小狗被掛在樹上明顯死亡。
            </p>
            <p>
              4.農委會於2022年3月1日起公告禁止一般人飼養比特犬違者將重罰，然而政府配套措施不足，導致許多原本飼養的大量飼主棄養比特犬，流落至街頭或收容所，加劇棄養的相關問題。
            </p>
            <template #footer
              ><div class="image-container">
                <img src="../assets/棄養問題.png" /> <img src="../assets/棄養問題2.png" /><img
                  src="../assets/棄養問題3.png"
                /><img src="../assets/棄養問題4.png" /></div
            ></template>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2 id="countermeasures">對策</h2>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
        <div data-aos="fade-up">
          <div class="demo-collapse">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item name="1">
                <template #title>
                  <div class="custom-title">源頭控管</div>
                </template>
                <p>
                  農業部林業及自然保育署為避免外來種持續入侵，業彙整相關法令依據及業務分工，實施具體管制措施，並推動相關防治行動，實施策略如下：
                </p>
                <p>
                  一、邊境管理<br />
                  1、加強加嚴邊境管制：為阻斷外來種入侵機會，評估檢討第2波禁止輸入物種（黑名單）計53項、8,478種，經函送國貿局後，已於111年5月19日依「貿易法」公告修正「限制輸入貨品表」，並於111年6月1日起正式生效。未來非經專案同意，均不得再輸入至國內，以從源頭阻絕外來種入侵。後續亦滾動式持續評估檢討，若有具入侵風險之其他物種，將動態增補公告第3波禁止輸入物種。<br />
                  2、加強物種輸入管控:動物之輸入採取「原則禁止，例外開放」原則，針對未曾有輸入紀錄之物種，逐案審查；現行申請輸入之物種，有危害本土生態、動物福利、疫病等疑慮時，即邀請相關機關及學者進行聯合審查，任何一方有提出不同意輸入之建議，則該物種不予同意輸入。對於曾有輸入紀錄之物種，亦再予檢視是否有潛在入侵、人畜安全、公共衛生（或野生動物間疾病傳播）、動物福利等風險後，將列入第三波禁止輸入物種名單。<br />
                </p>
                <p>
                  二、境內管理 <br />
                  1、108-111年底已防治小花蔓澤蘭4,431公頃、收購1,274公噸；銀膠菊1,288公頃；銀合歡710公頃；刺軸含羞木52公頃。112-113年恆春半島規劃銀合歡移除1,670公頃，並以原生樹種復育造林，逐步恢復原有生態環境，移除之銀合歡材料發展生質能轉換技術。<br />
                  2、108-111年底已移除綠鬣蜥98,291隻、埃及聖䴉成鳥18,076隻、海蟾蜍3,896隻，以清零為目標持續移除中。另依據野生動物保育法第31條第1項分別於109年8月20日及111年4月7日公告綠鬣蜥及海蟾蜍須登記備查始得繼續飼養，未經同意不得再繁殖，違者可處新臺幣1萬元至5萬元罰鍰，並可沒入。<br />
                  3、持續訂立檢討相關陸域外來入侵動物移除指引，要求移除須符合人道方式，確保無不當捕捉或虐待動物之嫌，在生態保護與生命教育間求取平衡，並兼顧生態保育與動物福利，避免發生虐待情事。<br />
                </p>
                <p>
                  三、入侵物種移除清零<br />
                  1、杜絕不當「放生」，轉化保育護生。協同內政部加強向宗教團體宣導生態保育概念，鼓勵參與「傷癒野生動物生態野放工作」，轉化「放生」為「保育護生」。<br />
                  2、加強民眾宣導教育，透過媒體宣導加強社會大眾生態保育觀念，並呼籲對野生動物生命應予以尊重；建構跨機關共同防治平台，並導入民間資源，降低政府支出。<br />
                </p>
                <p>
                  四、法規補強<br />
                  1、參考世界各國外來種管理法規架構，美、中與我國類同未訂有外來種管理專法，而係分散在不同法規管理。且我國「中央行政機關法制作業應注意事項」已規定，無現行法規可資適用或修正適用者，方須草擬新法規。且中央行政機關組織基準法第5條第3項，業已明訂不得以作用法或其他法規規定機關之組織及員額事項。爰訂立專法也僅能於現行機關架構下處理，更可能造成相關法令管轄範圍更為疊床架屋，爰係以強化農業部各主管法規對外來入侵種之管理，而不以訂立外來種管理專法之方向處理。<br />
                </p>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template #title>
                  <div class="custom-title">建立通報系統</div>
                </template>
                <p>
                  行政院為加強保護環境生態、保障社會公平正義、促進經濟發展、建設綠色矽島，於民國86年8月設置國家永續發展委員會。89年5月，永續會擬定「廿一世紀議程－中華民國永續發展策略綱領」，做為我國推動永續發展之策略依據。91年6月起，參考全球趨勢與高峰會永續發展行動計畫，規劃我國推動永續發展計畫架構，包括任務、理念、工作項目、具體工作內容、主協辦機關及執行期限等；並廣泛邀請專家學者研商，及舉辦公開研討會以集思廣益，擬定完成「永續發展行動計畫」，做為廿一世紀初期，我國以行動實踐永續發展之依據。
                  為防止外來物種入侵，以維護本土生態環境，永續發展委員會將「加強入侵種管理」明列為行動計畫表「生物多樣性分組」之重點工作。
                  90年核定之生物多樣性推動方案，納入「外來種之管理」業務，93年修正為「加強入侵種管理」業務，96年再度修正為「控制入侵種威脅」業務，工作項目如下：
                </p>
                <p>
                  一、建置外來種輸出入管理機制（包括物種輸出入管理及檢疫措施）。 <br />
                  二、建立外來種輸入風險評估及引入生態影響評估體系，並將評估結果據以擬定監（偵）測及防治策略。<br />
                  三、建立外來種監（偵）測、鑑定及早期預警機制，包含輸入之外來種後續追蹤管理（含寵物管理）。<br />
                  四、強化外來（入侵）種走私查緝。<br />
                  五、入侵種生物防治：<br />
                  1、研擬新入侵生物緊急撲滅計畫，並聯合地方政府定期演習。<br />
                  2、建立已入侵生物長期防治計畫，將入侵種造成之經濟損失及生態衝擊降至最小。 <br />
                  六、建立名錄： <br />
                  1、建立國內外來及入侵生物清單，研析生態、經濟危害及管理策略。<br />
                  2、建立國際高風險入侵種生物清單，研析入侵管道及預防入侵措施。<br />
                  農業部為避免外來種入侵造成我國生態與經濟的衝擊，於農委會時期整合所屬機關單位，依照分工權責建立「入侵種生物管理機制」，推動各項重點工作，包括建置外來種之管制、防疫、檢疫及監測機制、鑑定外來種為入侵種之風險評估機制，以及引入、野放與含逸出外來種之影響評估、管理及監測機制，並且積極進行影響本土生物多樣性及人畜疾病之入侵種防治，以及建立外來種清單等，以維護台灣生態，保障農業生產安全。
                  至112年組改後，入侵種生物管理業務彙總單位由林業及自然保育署（林務局）移回農業部資源永續利用司負責。
                </p>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template #title>
                  <div class="custom-title">法治教育</div>
                </template>
                <p>
                  聯合國依據《生物多樣性公約》所採行的決議，不僅大力支持各國發展因應入侵種的策略，同時也支持可促進跨部門協調的組織架構（國際上，
                  《生物多樣性公約》透過聯合工作計畫，與《國際植物保護公約》合作）。
                </p>
                <p>
                  已有幾個來自不同區域的國家採取行動，建立了國家級的「全方位」機構，
                  以促進機構協調合作和資訊分享︰自2005年以來，智利和烏拉圭已經建立了國家機構，以協調外來入侵種的工作。預計在不久的將來，
                  其它正在發展國家策略的南美洲國家也將比照辦理。
                </p>
                <p>
                  英國成立了「外來種論壇」範圍包括大不列顛島上的英格蘭、威爾斯和蘇格蘭，而愛爾蘭共和國和英國的北愛爾蘭則聯合設立了「愛爾蘭入侵種計畫」，並建立了跨國的共同資訊閘道。
                </p>
                <p>
                  可以考慮的做法包括︰指定一部會或機關來帶頭――如果其有能力，
                  且這項任務不會使其工作量或預算超出其所能負荷的話。相關部會首長的權限可能需要調整，以賦予和入侵種政策領域有關的特定職責。
                  在相關機構（如國家環境部或環保署）成立設有秘書處的入侵種技術顧問委員會，其可針對外來入侵種議題，向有關部會提出有效的意見。
                </p>
                <p>
                  這樣做通常較快速而便宜，且可以整合來自大學和研究機構的專門知識，但委員會往往沒有權力落實其決定；且某些國家可能已經設立了類似功能的生物安全委員會。成立獨立的法定機構，成員包括各部會的代表，以協調、反應有關問題和觀點。
                </p>
                <p>
                  採漸進模式，從非正式協調委員會開始，最終建立法定機構。除此之外，還必須考慮經費來源。
                  在建立穩定的籌資機制前，設有技術顧問委員會的主辦機構或許能夠提供核心資金。
                </p>
                <p>
                  國家政策文件、策略和行動計畫應該敘明︰ <br />
                  1.入侵種策略的願景和大小目標<br />
                  2.外來入侵種在國內的現狀和趨勢，並確認管理和防治的優先順序<br />
                  3.引入、利用外來種的主要部門、途徑、媒介和有關的風險<br />
                  4.確認權責與外來入侵種事務有關的各級政府機關，及其在此政策下的任務和責任<br />
                  5.相關部會機關之間的合作程序和體系<br />
                  6.利害相關者參與的程序和體系<br />
                  7.風險分析、風險管理規劃和風險減輕的準則<br />
                  8.與監測相關的需求<br />
                  9.訓練、能力建置的體系與相關需求<br />
                  10.如果適宜的話，對孤立生態系或生物多樣性豐富的生態系（例如島嶼、群島、保護區）提出具體策略或政策<br />
                  11.復育工作（針對受外來入侵種影響的生態系或物種）的相關需求<br />
                  12.如何促進原生物種的永續利用，而非進口物種 <br />
                  13.提升公眾意識的相關需求<br />
                  14.關於研究需求和資金的詳細說明<br />
                </p>
                <p>
                  許多國家和一些區域已制定（或即將定案）外來入侵種的策略，這些資料可透過網路輕易取得，並可提供想法和範例做為其他國家政策制定時的參考。
                  一般而言，關於入侵種的現行策略都符合《生物多樣性公約》指導原則所支持的三階段策略，即預防、偵測／監測調查、控制／滅除。
                </p>
                <p>
                  儘管國家之間和各大陸之間有地理上的差異，但這三階段策略完全適用於所有地區，包括非洲。
                  以下提供一些策略文件案例，這些例子很容易取得︰
                  南美洲國家如智利、秘魯、烏拉圭、巴西和哥倫比亞已開始制定國家策略，而巴拉圭和委內瑞拉則在政策發展初期；在加勒比海地區，
                  巴哈馬群島已制定了全面的策略，並為不同的對象（包括政府機關）制定了自願性的行為準則。
                </p>
                <p>
                  南太平洋即將確立該區域的外來入侵種策略，加拿大已訂定了國家外來入侵種策略，並設立了「外來入侵種合作計畫」，
                  針對特定目標提供資金，在歐洲，有三個國家（丹麥、瑞典、英國）在2008年夏季啟動國家策略，而歐盟已開始和27個會員國合作，
                  研擬外來入侵種的策略，泛歐洲層級的「歐洲外來入侵種策略」，在 2003年獲得正式批准。
                </p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2 id="conversation">交流專區</h2>
        <div data-aos="fade-up">
          <el-card class="box-card">
            <MessageBoard />
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2 id="Appeal">申訴專區</h2>
        <div data-aos="flip-up">
          <AppealForm />
        </div>
      </el-col>
      <!-- 使用 AuthForm 組件 -->
      <AuthForm />
    </el-row>
  </el-main>
  <div class="footer" :span="24" :xs="24">Copyright © 僅為泰山網頁前端班張建仁做專題用</div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import AuthForm from '@/components/authform.vue'
import MessageBoard from './MessageBoard.vue'
import AppealForm from './appealForm.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

export default {
  name: 'MainContent',
  components: {
    AuthForm,
    MessageBoard,
    AppealForm
  },
  setup() {
    const store = useStore()
    const items = ref([])
    const activeName = ref('1') // 默認展開第一項
    const isLoggedIn = ref(false)

    const fetchData = () => {
      // 模擬 API 請求
      items.value = [
        { id: 1, image: '../assets/入侵紅火蟻.png' },
        { id: 2, image: '../assets/中國梨木蝨.png' },
        { id: 3, image: '../assets/多線南蜥.png' },
        { id: 3, image: '../assets/河殼菜蛤.png' },
        { id: 3, image: '../assets/福壽螺.png' },
        { id: 3, image: '../assets/緬甸小鼠.png' }
      ]
    }

    const onLoginSuccess = () => {
      isLoggedIn.value = true
      fetchData()
    }

    // 監聽登入狀態變更
    watch(
      () => store.state.isLoggedIn,
      (newVal) => {
        if (newVal) {
          fetchData()
        }
      }
    )

    onMounted(() => {
      fetchData()
    })

    return {
      activeName,
      items,
      isLoggedIn,
      onLoginSuccess
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  color: black;
  font-size: 40px;
}

h4 {
  color: #607d8b;
  font-size: 25px;
}

.footer {
  text-align: center;
  color: #fff;
  background-color: #1f1f1f;
  padding: 3rem;
}

#card {
  background-color: #fff;
}

img {
  max-width: 100%;
  height: auto;
}

.demo-collapse p {
  font-size: 25px;
}

.custom-title {
  font-size: 35px;
  text-align: center;
  width: 100%;
  display: block;
  color: black;
}

.box-card {
  border: 1px solid var(--el-border-color-dark);
  box-shadow: var(--el-box-shadow);
  color: #ff372e;
  background: #fff;
}

.el-carousel {
  margin: 0 -5% 0;
}

.el-carousel__item:nth-child(1) {
  background: url('../assets/福壽螺.png') no-repeat center;
  background-size: 100% 50%;
}

.el-carousel__item:nth-child(2) {
  background: url('../assets/入侵紅火蟻.png') no-repeat center;
  background-size: 100% 50%;
}

.el-carousel__item:nth-child(3) {
  background: url('../assets/中國梨木蝨.png') no-repeat center;
  background-size: 100% 50%;
}

.el-carousel__item:nth-child(4) {
  background: url('../assets/河殼菜蛤.png') no-repeat center;
  background-size: 100% 50%;
}

.el-carousel__item:nth-child(5) {
  background: url('../assets/緬甸小鼠.png') no-repeat center;
  background-size: 100% 50%;
}

.el-carousel__item:nth-child(6) {
  background: url('../assets/多線南蜥.png') no-repeat center;
  background-size: 100% 50%;
}

/* 手機版面 */
@media (max-width: 768px) {
  .image-container {
    text-align: center;
  }
}

/* PC版樣式 */
@media (min-width: 769px) {
  .el-main {
    padding: 2em;
  }

  .image-container {
    display: flex;
    justify-content: space-between; /* 確保圖片之間的間距相等 */
    align-items: center;
  }

  .el-carousel__item {
    max-width: 100%;
    height: 200%;
    position: absolute;
    top: -50%;
  }

  .footer {
    margin: 0 -1.1% -1.1%;
  }
}
</style>
