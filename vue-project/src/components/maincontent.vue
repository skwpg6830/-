<template>
  <el-main>
    <el-row :gutter="20">
      <el-col>
        <div>
          <authform @login-success="onLoginSuccess" />
          <div v-if="isLoggedIn"></div>
          <el-carousel trigger="click" height="878px">
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
        <img src="../assets/面臨現狀.png" />
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <div style="font-size: 18px" class="text-center">
          <p>
            生物多樣性和生態系統服務政府間科學政策平台（Intergovernmental Science-Policy Platform on
            Biodiversity and Ecosystem Services），
            簡稱IPBES，是一個由不同國家的政府部門一同成立的國際機構。IPBES於2012年由94個成員國成立，目前共有近140個成員國。IPBES也與多個組織、民間團體、科學家、學術研究機構合作，
            以當前已知與生物多樣性、生態系統對人類相關貢獻（如糧食生產）的最佳科學知識為基礎，提供決策者制定與實施相關政策可參考的科學評估。<br />
            根據IPBES與國際自然保育聯盟（IUCN）的定義：<br />
            1.外來入侵種：是指動物、植物或其他生命體，無論有意還是無意，被人為引入到非牠們原本自然棲息的環境，而且已經威脅到原生的生物多樣性、生態系統、糧食安全、人類的經濟、健康和福祉。<br />
            2.外來種：意思是指一個物種因為逃逸、引入或散播到不是牠原本自然分布的棲息環境中。但是外來種不一定都會對原生的生態造成負面影響，也不是所有外來種都有辦法在野外自行繁殖，例如台灣的浣熊。若外來種在非原生的環境中可以自行繁衍，但還沒有擴大族群到威脅原生物種、或像入侵種影響生態的程度，可以稱為歸化種。<br />
            3.入侵種：指的是物種的生存擴大到已經對原生的生態系造成影響，如果這個造成負面影響的物種不是原本生態內的生物，就稱為「外來入侵種」。IPBES今年的報告指的主要是外來入侵種。<br />
            但是當地的原生物種也可能成為入侵種，當牠們數量增加或擴大族群範圍到變成有入侵性，且在特定的地區內威脅到原生物種的生存，會成為某個地區的入侵種，稱為「國內外來種」或「本土入侵種」。
            例如，以台灣西北部棲地為主的白頭翁，因為被人為放生到花東地區，而影響當地的台灣特有種烏頭翁的生存，造成原生的純種烏頭翁數量銳減。
            以台灣的情況，根據農業部2004年增修公告的優先防治、長期管理、觀察、監測或評估中之21種入侵種生物清單，
            包含入侵種紅火蟻、蘇鐵白輪盾介殼蟲、小花蔓澤蘭、緬甸小鼠、松材線蟲、中國梨木蝨、福壽螺、河殼菜蛤、布袋蓮、多線南蜥、刺桐釉小蜂
            、香澤蘭、銀合歡、豬草、沙氏變色蜥、亞洲錦蛙、白尾八哥、輝椋鳥、琵琶鼠、魚虎、美洲螯蝦。台灣近期常常聽到的外來種生物，還有斑腿樹蛙、埃及聖䴉、綠鬣蜥、俗稱巴西龜的紅耳泥龜等。
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
              <h4>農業方面損失</h4>
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
              <h4>公共設施方面損失</h4>
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
              <h4>大鼠</h4>
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
              <h4>鼬獾</h4>
            </div>
          </template>
          <p>
            鼬獾是鼬獾屬四種動物的一種正如大部分哺乳類，鼬獾也可能成為狂犬病宿主。遭感染並發病之鼬獾，會有異於其生態習性的行為產生，需特別注意。
          </p>
          <p>
            遇到鼬獾時請與之保持安全距離，勿接觸或餵食，避免被感染，罹患狂犬病的鼬獾會在2到3週內發病，症狀會較為狂躁，一旦發病就會邁向死亡。
          </p>
          <template #footer
            ><img src="../assets/鼬獾.jpg" /> <img src="../assets/鼬獾2.jpg"
          /></template>
        </el-card>
      </el-col>
      <el-col :span="24" :xs="24">
        <h3>競爭資源</h3>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <el-card>
          <template #header>
            <div class="card-header" style="text-align: center">
              <h4>白尾八哥</h4>
            </div>
          </template>
          <p>
            白尾八哥早年作為寵物鳥引入臺灣，除了籠中逸鳥，宗教放生更是助長其族群擴散。在野外最早的紀錄為1978年，從2013年開始族群急遽增加。
          </p>
          <p>
            白尾八哥的到來使得本土的野生麻雀遭受嚴重損失，有人目睹白尾八哥捕食麻雀幼雛，因兩種鳥類棲地重疊，白尾八哥體型上又較大，侵略性及地域性也強，所以遇到較弱小的就會去啄食。
          </p>
          <template #footer
            ><img src="../assets/白尾八哥.jpg" /> <img src="../assets/白尾八哥2.jpg"
          /></template>
        </el-card>
      </el-col>
      <el-col :span="12" :sm="12" :xs="24">
        <el-card>
          <template #header>
            <div class="card-header" style="text-align: center">
              <h4>紅嘴藍鵲</h4>
            </div>
          </template>
          <p>
            紅嘴藍鵲又稱中國藍鵲，分布於喜馬拉雅山脈、印度東北部、中國、緬甸及印度支那，這種鳥的飛行能力既不算強，本身亦無遷徙的習性，按理說是不該出現在台灣地區，近年來卻時而聽到關於牠們出沒的風聲。
          </p>
          <p>
            紅嘴藍鵲無論是習性、飲食或適合棲地等各方面的生存條件，皆與本土的台灣藍鵲相似，因此牠的出現也意味著領域競爭的威脅，長期下來有可能導致台灣藍鵲族群銳減、甚至絕滅。
          </p>
          <template #footer
            ><img src="../assets/紅嘴藍鵲.jpg" /> <img src="../assets/紅嘴藍鵲2.jpg"
          /></template>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2 id="countermeasures">對策</h2>
      </el-col>
      <el-col :span="24" :sm="24" :xs="24">
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
                一、邊境管理
                （一）加強加嚴邊境管制：為阻斷外來種入侵機會，評估檢討第2波禁止輸入物種（黑名單）計53項、8,478種，經函送國貿局後，已於111年5月19日依「貿易法」公告修正「限制輸入貨品表」，並於111年6月1日起正式生效。未來非經專案同意，均不得再輸入至國內，以從源頭阻絕外來種入侵。後續亦滾動式持續評估檢討，若有具入侵風險之其他物種，將動態增補公告第3波禁止輸入物種。
                （二）加強物種輸入管控:動物之輸入採取「原則禁止，例外開放」原則，針對未曾有輸入紀錄之物種，逐案審查；現行申請輸入之物種，有危害本土生態、動物福利、疫病等疑慮時，即邀請相關機關及學者進行聯合審查，任何一方有提出不同意輸入之建議，則該物種不予同意輸入。對於曾有輸入紀錄之物種，亦再予檢視是否有潛在入侵、人畜安全、公共衛生（或野生動物間疾病傳播）、動物福利等風險後，將列入第三波禁止輸入物種名單。
                二、境內管理 （一）入侵物種移除清零
                1、108-111年底已防治小花蔓澤蘭4,431公頃、收購1,274公噸；銀膠菊1,288公頃；銀合歡710公頃；刺軸含羞木52公頃。112-113年恆春半島規劃銀合歡移除1,670公頃，並以原生樹種復育造林，逐步恢復原有生態環境，移除之銀合歡材料發展生質能轉換技術。
                2、108-111年底已移除綠鬣蜥98,291隻、埃及聖䴉成鳥18,076隻、海蟾蜍3,896隻，以清零為目標持續移除中。另依據野生動物保育法第31條第1項分別於109年8月20日及111年4月7日公告綠鬣蜥及海蟾蜍須登記備查始得繼續飼養，未經同意不得再繁殖，違者可處新臺幣1萬元至5萬元罰鍰，並可沒入。
                3、持續訂立檢討相關陸域外來入侵動物移除指引，要求移除須符合人道方式，確保無不當捕捉或虐待動物之嫌，在生態保護與生命教育間求取平衡，並兼顧生態保育與動物福利，避免發生虐待情事。
                （二）杜絕不當「放生」，轉化保育護生。協同內政部加強向宗教團體宣導生態保育概念，鼓勵參與「傷癒野生動物生態野放工作」，轉化「放生」為「保育護生」。
                （三）加強民眾宣導教育，透過媒體宣導加強社會大眾生態保育觀念，並呼籲對野生動物生命應予以尊重；建構跨機關共同防治平台，並導入民間資源，降低政府支出。
                三、法規補強
                參考世界各國外來種管理法規架構，美、中與我國類同未訂有外來種管理專法，而係分散在不同法規管理。且我國「中央行政機關法制作業應注意事項」已規定，無現行法規可資適用或修正適用者，方須草擬新法規。且中央行政機關組織基準法第5條第3項，業已明訂不得以作用法或其他法規規定機關之組織及員額事項。爰訂立專法也僅能於現行機關架構下處理，更可能造成相關法令管轄範圍更為疊床架屋，爰係以強化農業部各主管法規對外來入侵種之管理，而不以訂立外來種管理專法之方向處理。
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
                （一）建置外來種輸出入管理機制（包括物種輸出入管理及檢疫措施）。 <br />
                （二）建立外來種輸入風險評估及引入生態影響評估體系，並將評估結果據以擬定監（偵）測及防治策略。<br />
                （三）建立外來種監（偵）測、鑑定及早期預警機制，包含輸入之外來種後續追蹤管理（含寵物管理）。<br />
                （四）強化外來（入侵）種走私查緝。<br />
                （五）入侵種生物防治：<br />
                （1）研擬新入侵生物緊急撲滅計畫，並聯合地方政府定期演習。<br />
                （2）建立已入侵生物長期防治計畫，將入侵種造成之經濟損失及生態衝擊降至最小。 <br />
                （六）建立名錄： <br />
                （1）建立國內外來及入侵生物清單，研析生態、經濟危害及管理策略。<br />
                （2）建立國際高風險入侵種生物清單，研析入侵管道及預防入侵措施。<br />
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
                《生物多樣性公約》透過聯合工作計畫，與《國際植物保護公約》合作）。已有幾個來自不同區域的國家採取行動，建立了國家級的「全方位」機構，
                以促進機構協調合作和資訊分享︰自2005年以來，智利和烏拉圭已經建立了國家機構，以協調外來入侵種的工作。預計在不久的將來，
                其它正在發展國家策略的南美洲國家也將比照辦理。英國成立了「外來種論壇」（Non-Native
                Species Forum）（範圍包括大不列顛島上的英格蘭、威爾斯和蘇格蘭），
                而愛爾蘭共和國和英國的北愛爾蘭則聯合設立了「愛爾蘭入侵種計畫」（Invasive Species
                Irelandproject）， 並建立了跨國的共同資訊閘道。(http://www.
                invasivespeciesireland.com/)。可以考慮的做法包括︰指定一部會或機關來帶頭――如果其有能力，
                且這項任務不會使其工作量或預算超出其所能負荷的話。相關部會首長的權限可能需要調整，以賦予和入侵種政策領域有關的特定職責。
                在相關機構（如國家環境部或環保署）成立設有秘書處的入侵種技術顧問委員會，其可針對外來入侵種議題，向有關部會提出有效的意見。
                這樣做通常較快速而便宜，且可以整合來自大學和研究機構的專門知識，但委員會往往沒有權力落實其決定；且某些國家可能已經設立了類似功能的生物安全委員會。
                成立獨立的法定機構，成員包括各部會的代表，以協調、反應有關問題和觀點。採漸進模式，從非正式協調委員會開始，最終建立法定機構。除此之外，還必須考慮經費來源。
                在建立穩定的籌資機制前，設有技術顧問委員會的主辦機構或許能夠提供核心資金（core
                funding；編註：指組織和行政的基本核心費用）。
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
                儘管國家之間和各大陸之間有地理上的差異，但這三階段策略完全適用於所有地區，包括非洲。
                以下提供一些策略文件案例，這些例子很容易取得︰
                南美洲國家如智利、秘魯、烏拉圭、巴西和哥倫比亞已開始制定國家策略，而巴拉圭和委內瑞拉則在政策發展初期；在加勒比海地區，
                巴哈馬群島已制定了全面的策略，並為不同的對象（包括政府機關）制定了自願性的行為準則（www.best.bs
                / Documents / bahamas_nationalstrategy.doc）；
                南太平洋即將確立該區域的外來入侵種策略（www.sprep.org）；加拿大已訂定了國家外來入侵種策略，並設立了「外來入侵種合作計畫」（Invasive
                AlienSpecies PartnershipProgramme），
                針對特定目標提供資金（http://www.ec.gc.ca/eee-ias/）；在歐洲，有三個國家（丹麥、瑞典、英國）在2008年夏季啟動國家策略，而歐盟已開始和27個會員國合作，
                研擬外來入侵種的策略（http://ec.europa.eu/environment/）；泛歐洲層級的「歐洲外來入侵種策略」（European
                Strategy on Invasive AlienSpecies），在 2003年獲得正式批准。
              </p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2 id="conversation">交流專區</h2>
        <el-card class="box-card">
          <MessageBoard />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" :xs="24">
        <h2 id="material">資料彙整</h2>
        <a
          style="display: flex; justify-content: center"
          href="https://conservation.forest.gov.tw/aspropaganda"
          target="_blank"
          >農業部林業及自然保育署自然保育網</a
        >
        <a
          style="display: flex; justify-content: center"
          href="https://taicol.tw/zh-hant/catalogue?alien_type=invasive&date=&keyword=&name-select=contain&date-select=gl&page=1"
          target="_blank"
          >台灣物種名錄</a
        >
        <a
          style="display: flex; justify-content: center"
          href="https://smctw.tw/16404/"
          target="_blank"
          >台灣科技媒體中心</a
        >
        <a
          style="display: flex; justify-content: center"
          href="https://gisd.biodiv.tw/taiwan_add_1.php"
          target="_blank"
          >全球入侵種資料庫</a
        >
        <a
          style="display: flex; justify-content: center"
          href="http://www.swan.org.tw/docdir/AZPH9O21Q4.pdf"
          target="_blank"
          >台灣十大外來入侵物種</a
        >
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

export default {
  name: 'MainContent',
  components: {
    AuthForm,
    MessageBoard
  },
  setup() {
    const store = useStore()
    const items = ref([])
    const activeName = ref('1') // 默认展开第一项
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
  color: #ff372e;
  font-size: 40px;
}

h3 {
  text-align: center;
  color: #2ed64b;
  font-size: 30px;
}

h4 {
  color: #03a9f4;
  font-size: 25px;
}

.footer {
  text-align: center;
  color: #fff;
  background-color: #1f1f1f;
  padding: 3rem;
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
  color: #2ed64b;
}

.box-card {
  border: 1px solid var(--el-border-color-dark);
  box-shadow: var(--el-box-shadow);
  color: #ff372e;
  background: #fff176;
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

/* PC版樣式 */
@media (min-width: 769px) {
  .el-main {
    padding: 2em;
  }

  .el-col img:first-child {
    float: left;
    margin-right: 5em;
  }

  .el-col img:last-child {
    float: right;
    margin-left: 5em;
  }

  .el-carousel__item {
    max-width: 100%;
    height: 200%;
    position: absolute;
    top: -50%;
  }
}
</style>
