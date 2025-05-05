import {
  Box,
  GridColumn,
  GridContainer,
  GridRow,
  Text,
  BulletList,
  Bullet,
  Blockquote,
} from '@island.is/island-ui/core'

const SkuldirOgVaxtagjold = () => {
  return (
    <Box marginBottom={[6, 6, 10]}>
      <GridContainer>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '8/12']}
            offset={['0', '0', '0', '2/12']}
          >
            <Text variant="h1" as="h1" marginBottom={5}>
              Skuldir og vaxtagjöld
            </Text>

            {/* 5.1 Vaxtagjöld vegna kaupleiguíbúða eða búseturéttar */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                5.1 Vaxtagjöld vegna kaupleiguíbúða eða búseturéttar
              </Text>
              <Text variant="default" marginBottom={2}>
                Þeir sem keypt hafa búseturétt/eignarhlut í kaupleiguíbúð eiga
                rétt á vaxtabótum vegna vaxtagjalda sem innheimt eru með
                leigugjöldum, auk vaxtagjalda vegna lána sem tekin eru vegna
                kaupa á búseturétti eða eignarhlut.
              </Text>
              <Text variant="default">
                Séu þessar upplýsingar ekki áritaðar þarf leigutaki að snúa sér
                til leigusala eftir þeim, og færa þær á framtal. Vaxtagjöld
                færast í reit 166 og eftirstöðvar skulda í reit 167.
              </Text>
            </Box>

            {/* 5.2 Lán vegna íbúðarhúsnæðis */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                5.2 Lán vegna íbúðarhúsnæðis
              </Text>
              <Text variant="default" marginBottom={1}>
                Vaxtagjöld af lánum vegna íbúðarhúsnæðis til eigin nota mynda
                stofn til vaxtabóta. Hér er átt við lán vegna:
              </Text>
              <Box marginBottom={2} paddingLeft={3}>
                <BulletList type="ul" space={1}>
                  <Bullet>kaupa á íbúðarhúsnæði</Bullet>
                  <Bullet>byggingar íbúðarhúsnæðis</Bullet>
                  <Bullet>
                    verulegra endurbóta á íbúðarhúsnæði (á eingöngu við um lán
                    frá Íbúðalánasjóði)
                  </Bullet>
                  <Bullet>
                    greiðsluerfiðleika eða endurfjármögnunar íbúðarlána
                  </Bullet>
                  <Bullet>
                    kaupa á búseturétti/eignarhlut í kaupleiguíbúð
                  </Bullet>
                </BulletList>
              </Box>

              <Text variant="h4" fontWeight="semiBold" marginBottom={1}>
                Skammtímalán
              </Text>
              <Text variant="default" marginBottom={1}>
                Vaxtagjöld vegna lána til skemmri tíma en tveggja ára mynda
                stofn til vaxtabóta en einungis:
              </Text>
              <Box marginBottom={2} paddingLeft={3}>
                <BulletList type="ul" space={1}>
                  <Bullet>
                    á næstu fjórum árum (tekjuárum) talið frá og með kaupári og
                    er þá miðað við dagsetningu kaupsamnings, eða
                  </Bullet>
                  <Bullet>
                    á næstu sjö árum talið frá og með því ári þegar bygging er
                    hafin eða til og með því ári sem húsnæðið er tekið til
                    íbúðar ef það er síðar.
                  </Bullet>
                </BulletList>
              </Box>

              <Text variant="h4" fontWeight="semiBold" marginBottom={2}>
                Leiðbeiningar við útfyllingu einstakra reita í lið 5.2
              </Text>
              <Text variant="default" marginBottom={3}>
                Gera skal grein fyrir staðsetningu íbúðarhúsnæðis. Í reitinn
                kaupár skal færa hvenær húsnæðið var keypt. Húsbyggjandi skal
                færa hér hvenær bygging hófst. Síðan skal sundurliða upplýsingar
                um einstök lán í merkta reiti, sbr. eftirfarandi skýringar:
              </Text>

              {/* Numbered list simulation */}
              <Box marginBottom={2}>
                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    1 Lánveitandi/lánsnúmer.
                  </Text>
                </Text>
                <Text variant="default" marginBottom={2}>
                  Hér skal tilgreina lánveitanda og númer láns.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    Hlutfall (%)
                  </Text>
                </Text>
                <Text variant="default" marginBottom={2}>
                  Reitinn Hlutfall (%) á eingöngu að nota þegar aðeins hluti
                  lánsins var nýttur vegna kaupa íbúðarhúsnæðis. Þótt lán sé
                  hlutfallað skal færa heildargreiðslur af láninu í reiti 5 og
                  6, en vaxtagjöld og eftirstöðvar reiknast sjálfkrafa í réttum
                  hlutföllum í reitum 9 og 10. Sá hluti lánsins sem var til
                  annara nota færist sjálfkrafa í kafla 5.5.
                </Text>
                <Text variant="default" marginBottom={2}>
                  Ef lán skiptist á tvo eða fleiri kaupendur skal hver færa sinn
                  hlut á sitt framtal með því að lækka fjárhæðir í reitum 5, 6,
                  7, 8 og 10 hlutfallslega. Reitinn Hlutfall (%) á ekki að nota
                  til að skipta láni milli kaupenda.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    2 Lántökudagur.
                  </Text>{' '}
                  Hér skal greina frá dagsetningu lántöku, þ.e. hvenær lánið var
                  upphaflega tekið. Alltaf skal færa upphaflega
                  lántökudagsetningu, þótt um yfirtekið lán sé að ræða.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    3 Lánstími.
                  </Text>{' '}
                  Hér skal færa lánstíma talið frá upphaflegu lántökuári.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    4 Yfirtökudagur.
                  </Text>{' '}
                  Hér skal greina frá dagsetningu yfirtöku ef um yfirtekið lán
                  sé að ræða.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    5 Heildargreiðslur ársins.
                  </Text>{' '}
                  Hér skal færa afborganir, verðbætur og vexti sem gjaldféllu
                  eftir 1. janúar 2011 og greiddir voru á árinu 2023, ásamt
                  árlegum og tímabundnum fastakostnaði. Með vöxtum teljast
                  einnig dráttarvextir sem greiddir voru á árinu.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    6 Afborgun af nafnverði.
                  </Text>
                </Text>
                <Text variant="default" marginBottom={3}>
                  Í þennan reit færist nafnverð gjaldfallinna afborgana sem
                  greiddar voru á árinu. Kvittanir bera með sér upplýsingar um
                  nafnverð afborgana, en þegar verðtryggð lán eru yfirtekin þá
                  þarf að gera leiðréttingar. Finna þarf nýja afborgun í hendi
                  þess sem yfirtekur lánið.
                </Text>

                <Box marginBottom={3}>
                  <Blockquote>
                    <Text variant="h4" fontWeight="semiBold" marginBottom={2}>
                      Lán vegna íbúðakaupa
                    </Text>
                    <Text variant="default" marginBottom={2}>
                      Á rafrænu sundurliðunarblaði með framtali koma fram
                      upplýsingar um lán frá bönkum, sparisjóðum og
                      Íbúðalánasjóði. Ef fyrir liggur að lán sé vegna
                      íbúðarhúsnæðis til eigin nota er það skráð í lið 5.2 á
                      framtali en annars í lið 5.5. Á vefframtalinu er að finna
                      nánari upplýsingar og skýringar varðandi áritunina.
                    </Text>
                    <Text variant="default" marginBottom={2}>
                      Hjá þeim sem eru upphaflegir lántakendur eru upplýsingar á
                      sundurliðunarblaði í samræmi við upplýsingar á
                      greiðsluseðlum ársins 2023.
                    </Text>
                    <Text variant="default" marginBottom={2}>
                      Til hagræðingar fyrir þá sem hafa yfirtekið lán frá
                      Íbúðalánasjóði 2006 eða síðar koma að auki fram
                      upplýsingar um uppreiknaðar afborganir miðað við yfirtöku.
                      Í þeim tilvikum skal færa uppreiknaðar afborganir í reit 6
                      í lið 5.2 á framtali. Hafi láni verið nafnbreytt af öðrum
                      ástæðum en vegna sölu, t.d. vegna hjónaskilnaðar eða
                      sambúðarslita, skal færa &quot;Afborgun af nafnverði&quot;
                      í reit 6.
                    </Text>
                    <Text variant="default" marginBottom={2}>
                      Upplýsingar um lántökukostnað koma ekki fram á
                      sundurliðunarblaði og þarf framteljandi að færa þær
                      upplýsingar í reit 8 í lið 5.2 á framtali. Þá getur vantað
                      á sundurliðunarblað fullnægjandi upplýsingar um lán sem
                      yfirtekin voru á árinu 2023. Bæði kaupandi og seljandi
                      þurfa að gæta þess að færa réttar upplýsingar á framtalið
                      miðað við vaxtauppgjör þeirra á milli.
                    </Text>
                    <Text variant="default">
                      Sundurliðunarblaðið ber ekki með sér upplýsingar um
                      uppreiknaðar afborganir lána sem yfirtekin voru fyrir 1991
                      og í þeim tilvikum þarf framteljandi að uppreikna
                      afborganir lánsins miðað við yfirtökudag. Sama á við hafi
                      yfirtekið lán verið greitt upp á árinu. Sjá skýringar
                      varðandi uppreikning lána í 5.2, 6. tölulið.
                    </Text>
                  </Blockquote>
                </Box>

                <Text variant="default" marginBottom={2}>
                  Við útreikning á nýrri afborgun er notuð sú aðferð að deila í
                  vísitölu yfirtökumánaðar með upphaflegri vísitölu. Vísitölur
                  koma fram á greiðsluskjölum en jafnframt má finna upplýsingar
                  um þær á vef Hagstofu Íslands, hagstofa.is.
                </Text>
                <Text variant="default" marginBottom={2}>
                  Þannig er fundinn verðhækkunarstuðull og með honum er
                  margfölduð sú afborgun af nafnverði sem kemur fram á hverjum
                  greiðsluseðli.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    Erlend lán.
                  </Text>
                </Text>
                <Text variant="default" marginBottom={2}>
                  Þegar fundin er afborgun af nafnverði af erlendum lánum er
                  fjárhæð afborgunar í erlendri mynt margfölduð með genginu eins
                  og það var á lántökudegi samkvæmt lánsskjölum. Þegar erlend
                  lán eru yfirtekin skal margfalda afborgunina með því gengi sem
                  er í gildi á yfirtökudegi. Afborganir ársins af nafnverði eru
                  síðan færðar í reit 6.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    7 Afföll.
                  </Text>
                </Text>
                <Text variant="default" marginBottom={2}>
                  Afföll vegna sölu á skuldabréfum geta myndað stofn til
                  vaxtabóta ef útgefandi skuldabréfsins hefur notað andvirðið
                  til öflunar á íbúðarhúsnæði til eigin nota. Afföll reiknast
                  sem stofn til vaxtabóta með hlutfallslegri fjárhæð ár hvert
                  eftir afborgunartíma bréfsins. Afföll vegna sölu á
                  skuldabréfum eða húsbréfum sem seljandi hefur fengið í hendur
                  sem greiðslu á fasteign koma ekki til álita sem stofn til
                  vaxtabóta.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    8 Lántökukostnaður.
                  </Text>
                </Text>
                <Text variant="default" marginBottom={2}>
                  Hér skal færa lántökukostnað, þ.e. lántökugjöld vegna nýrra og
                  yfirtekinna lána, kostnað vegna skuldbreytinga, stimpilgjöld,
                  þóknanir og þinglýsingarkostnað af lánum, en hann myndar stofn
                  til vaxtabóta. Uppgreiðslugjald telst til lántökukostnaðar í
                  þessu sambandi. Þinglýsingarkostnaður og stimpilgjöld af
                  kaupsamningi eða afsali sem og umsýslugjald til fasteignasala
                  teljast ekki til vaxtagjalda.
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    9 Vaxtagjöld.
                  </Text>
                </Text>
                <Text variant="default" marginBottom={2}>
                  Í þennan dálk færist samtala fjárhæða í reitum 5, 7 og 8 og
                  frá þeim dregin fjárhæð í reit 6. Ef aðeins hluti lánsins var
                  vegna íbúðarhúsnæðis, skal þó lækka vaxtagjöldin í samræmi við
                  tilgreint hlutfall í reit 1. Í dálk 9 skal því færa (5-6+7+8)
                  x hlutfall (%).
                </Text>

                <Text variant="default" marginBottom={1}>
                  <Text as="span" fontWeight="semiBold">
                    10 Eftirstöðvar skulda.
                  </Text>
                </Text>
                <Text variant="default">
                  Í þennan dálk færast eftirstöðvar skulda eins og þær eru í
                  árslok. Eftirstöðvar erlendra lána eru fundnar með því að
                  margfalda eftirstöðvar með gengi gjaldmiðilsins í árslok, sjá
                  töflu á bls. 33. Niðurstöðutalan úr þessum dálki færist í reit
                  45. Ef aðeins hluti lánsins var vegna íbúðarhúsnæðis, skal þó
                  lækka eftirstöðvarnar í samræmi við tilgreint hlutfall í reit
                  1. Bent skal á að upplýsingar um þann hluta lánsins sem ekki
                  tilheyrir íbúðarhúsnæði til eigin nota skal færa í kafla 5.5.
                  Þegar talið er fram á vefnum reiknast hlutföllin sjálfkrafa.
                </Text>
              </Box>
            </Box>

            {/* 5.3 Eftirstöðvar skulda á söludegi */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                5.3 Eftirstöðvar skulda á söludegi
              </Text>
              <Text variant="default" marginBottom={2}>
                Þeir sem selt hafa íbúðarhúsnæði á árinu og ekki keypt eða hafið
                byggingu annars íbúðarhúsnæðis í stað hins selda fyrir árslok
                skulu færa eftirstöðvar skulda eins og þær voru á söludegi í
                dálk 10. Þeir færa enga fjárhæð í reit 45 á framtali heldur færa
                þeir niðurstöðutöluna í reit 41. Á vefframtalinu þarf að merkja
                við í hvorn reitinn niðurstöðutalan á að fara.
              </Text>
              <Text variant="h4" fontWeight="semiBold" marginBottom={1}>
                Skuldbreyting vegna vanskila, frysting láns – frestun
              </Text>
              <Text variant="default" marginBottom={2}>
                Sem stofn til vaxtabóta teljast gjaldfallin vaxtagjöld sem
                greidd voru á árinu, þ.e. verðbætur og vextir. Sé samið um
                breytingu á skilmálum láns sem er í vanskilum, með því að breyta
                vanskilunum í nýtt lán, telst sá hluti vanskilanna, sem eru
                vextir og verðbætur, til gjaldfallinna og greiddra vaxtagjalda
                þegar formlega er gengið frá þessari nýju lántöku, hvort heldur
                það er gert með því að bæta vanskilunum við höfuðstól lánsins
                eða að veitt er alveg nýtt lán.
              </Text>
              <Text variant="default" marginBottom={2}>
                Þegar lán er fryst eða greiðslum frestað án þess að veitt sé
                nýtt lán, sbr. framanritað, teljast áfallnir vextir af þeim ekki
                sem stofn til vaxtabóta fyrr en greiðsla fer fram. Sá hluti
                frestaðra greiðslna sem eru vextir og verðbætur teljast með í
                stofni til vaxtabóta þegar greiðsla fer fram eða þegar þeim er
                formlega bætt við höfuðstól lánsins og teljast nýtt lán með þeim
                hætti.
              </Text>
              <Text variant="h4" fontWeight="semiBold" marginBottom={1}>
                Fyrirframgreiðsla vaxtabóta
              </Text>
              <Text variant="default">
                Þeir sem fengu fyrirframgreiddar vaxtabætur vegna vaxtagjalda á
                árinu 2023 þurfa eftir sem áður að gera grein fyrir vaxtagjöldum
                vegna íbúðarkaupa á framtali sínu. Hafi önnur lán verið tekin
                vegna öflunar íbúðarhúsnæðis en þau sem notuð voru við
                útreikning fyrirframgreiðslu, skal gera grein fyrir vaxtagjöldum
                af þeim á framtali.
              </Text>
            </Box>

            {/* 5.4 Skuldir umfram eignir skv. efnahagsreikningi */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                5.4 Skuldir umfram eignir skv. efnahagsreikningi
              </Text>
              <Text variant="default">
                Skuldir umfram eignir 31. desember 2023 færast í reit 165
                samkvæmt Samræmingarblaði RSK 4.05 og eyðublaði um
                atvinnurekstur (RSK 1.04, 4.10, 4.11 eða 4.08) eftir umfangi og
                eðli rekstrar.
              </Text>
            </Box>

            {/* 5.5 Aðrar skuldir og vaxtagjöld */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                5.5 Aðrar skuldir og vaxtagjöld
              </Text>
              <Text variant="default" marginBottom={2}>
                Skuldir vegna kaupa eða byggingar íbúðarhúsnæðis til eigin nota
                færast undir lið 5.2 (sjá næstu opnu) en hér færast aðrar
                skuldir og vaxtagjöld af þeim. Verðtryggðar skuldir færast með
                áföllnum verðbótum í árslok. Óverðtryggðar skuldir færast á
                nafnverði eftir síðustu afborgun. Skuldir í erlendri mynt skal
                telja á sölugengi í árslok. Skuldir barna innan 16 ára færast
                einnig hér.
              </Text>
              <Text variant="h4" fontWeight="semiBold" marginBottom={1}>
                Áritaðar &quot;Aðrar skuldir&quot;
              </Text>
              <Text variant="default" marginBottom={2}>
                Á vefframtalið eru áritaðar undir þessum lið upplýsingar um
                námslán frá Menntasjóði námsmanna, en þær eiga að stemma við
                áramótastöðu sem lánþegar geta nálgast á &quot;Mitt lán&quot; á
                menntasjodur.is.
              </Text>
              <Text variant="default" marginBottom={2}>
                Einnig eru árituð hér ökutækjalán frá tryggingafélögum sem og
                fjármögnunarleigum ef ökutæki telst í eigu lántakanda og er
                skuld vegna hvers ökutækis skráð á framtalið.
              </Text>
              <Text variant="h4" fontWeight="semiBold" marginBottom={1}>
                Ýmsar lánaupplýsingar (5.2 eða 5.5)
              </Text>
              <Text variant="default" marginBottom={2}>
                Upplýsingar um lán frá bönkum, sparisjóðum, lífeyrissjóðum og
                verðbréfafyrirtækjum eru áritaðar.
              </Text>
              <Text variant="default" marginBottom={2}>
                Þegar ekki liggja fyrir upplýsingar um hvort þessi lán veiti
                rétt til vaxtabóta eru þau ekki árituð á framtalið og þarf
                framteljandi sjálfur að færa þau á viðeigandi stað, þ.e. lið 5.2
                á framtali, ef þau eru vegna kaupa á íbúðarhúsnæði til eigin
                nota, annars í lið 5.5, eða á viðeigandi rekstrarblað ef þau
                tengjast rekstri.
              </Text>
              <Text variant="default" marginBottom={2}>
                Á sundurliðunarblaðinu eru einnig lánaupplýsingar vegna
                ökutækja.
              </Text>
              <Text variant="default">
                Sé ekki ljóst hvort lánin séu vegna ökutækis sem notað er í
                rekstri eru lánin þó ekki árituð á framtalið heldur þarf
                framteljandi sjálfur að færa þau á viðeigandi stað.
              </Text>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

export default SkuldirOgVaxtagjold
