import {
  Box,
  GridColumn,
  GridContainer,
  GridRow,
  Text,
} from '@island.is/island-ui/core'

const EignirOgSkuldirIArslok = () => {
  return (
    <Box marginBottom={[6, 6, 10]}>
      <GridContainer>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '8/12']}
            offset={['0', '0', '0', '2/12']}
          >
            <Text variant="h1" as="h1" marginBottom={5}>
              Eignir og skuldir í árslok
            </Text>

            {/* 4.1 Innlendar fasteignir */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                4.1 Innlendar fasteignir
              </Text>
              <Text variant="h4" fontWeight="semiBold" marginBottom={1}>
                Áritun fasteigna á framtal
              </Text>
              <Text variant="default" marginBottom={2}>
                Upplýsingar frá Húsnæðis- og mannvirkjastofnun um mat fasteigna
                í árslok 2023 eru áritaðar á framtalið.
              </Text>
              <Text variant="default" marginBottom={2}>
                Vanti í einhverjum tilvikum fasteignir inn í fasteignamatið og
                sundurliðunina, þarf að bæta þeim á framtalið. Einnig getur
                þurft að leiðrétta áritaða fjárhæð á framtali eða bæta henni
                við, sé fasteignamatið ekki áritað. Leiðréttingar sem þessar
                geta m.a. átt við ef fasteignamat hefur breyst vegna
                kærumeðferðar og nýtt fasteignamat borist framteljanda áður en
                framtalsgerð lýkur. Í þeim tilvikum skal nýja fasteignamatið
                fært á framtal. Leiðréttingu á árituðu fasteignamati þarf
                framteljandi að rökstyðja með nauðsynlegum fylgigögnum auk þess
                sem geta skal um slíkt í athugasemdum í lið 1.4.
              </Text>
              <Text variant="default" marginBottom={2}>
                Upplýsingar um fasteignir og fasteignamat er að finna á
                island.is eftir innskráningu, undir &quot;Fasteignir&quot;.
                Tilgreina skal heildarmat (þ.e. fasteignamat samtals) og
                fastanúmer fyrir hverja eign. Framteljandi skráir aðeins sinn
                eignarhluta ef um sameign er að ræða.
              </Text>
              <Text variant="h4" fontWeight="semiBold" marginBottom={1}>
                Matsverð fasteigna
              </Text>
              <Text variant="default" marginBottom={2}>
                Fasteignir í byggingu teljast til eignar á kostnaðarverði skv.
                Húsbyggingarskýrslu RSK 3.03 en henni ber að skila vegna
                nýbygginga eða endurbóta á húsnæði (sjá nánar um eyðublaðið á
                bls. 23). Hafi fasteign t.d. verið metin fokheld til
                fasteignamats skal færa hana til eignar á því mati. Við bætist
                byggingarkostnaður sem til hefur fallið síðan, til ársloka 2023.
              </Text>
              <Text variant="default" marginBottom={2}>
                Byggingarkostnaður vegna viðbygginga, breytinga eða endurbóta á
                þegar metnum eldri fasteignum skal færður sérstaklega til eignar
                á sama hátt.
              </Text>
              <Text variant="default" marginBottom={2}>
                Ómetnar fasteignir sem keyptar voru á árinu 2023 færast á
                kostnaðarverði, en eldri eignir á því verði sem fært var í
                skattframtali 2023.
              </Text>
              <Text variant="default" marginBottom={2}>
                Leigutakar leigulóða skulu færa leigulóðir til eignar á
                fasteignamatsverði.
              </Text>
              <Text variant="default">
                Fasteignir barna færast í þennan lið með fasteignum framfæranda.
              </Text>
            </Box>

            {/* 4.2 Erlendar fasteignir */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                4.2 Erlendar fasteignir
              </Text>
              <Text variant="default">
                Erlendar fasteignir skal færa á fasteignamatsverði umreiknuðu í
                íslenskar krónur miðað við gengi í árslok 2023. Sé fasteignamat
                ekki fyrir hendi skal miða eignfærslu við kaupverð umreiknað í
                íslenskar krónur á gengi í árslok 2023.
              </Text>
            </Box>

            {/* 4.3 Bifreiðir */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                4.3 Bifreiðir
              </Text>
              <Text variant="default" marginBottom={2}>
                Bifreiðaeign í árslok færist í reit 06. Heimilt er að færa verð
                bifreiða niður um 10% frá því verði sem þær voru taldar til
                eignar á framtali 2023. Hafi framteljandi átt bifreiðina árið
                áður er verð hennar einnig áritað, niðurfært um 10%. Bifreiðir
                sem keyptar voru á árinu 2023 færast á kaupverði.
              </Text>
              <Text variant="default" marginBottom={2}>
                Bifreiðir barna færast einnig hér. Á vefframtal eru árituð
                fastanúmer bifreiða. Ef um er að ræða bifreið sem keypt var ný á
                árinu 2023 og verð hennar var skráð hjá Samgöngustofu er sú
                fjárhæð árituð á framtal, en ella þarf framteljandi að færa
                sjálfur inn kaupverðið. Þegar um er að ræða kaupleigubifreiðir
                eru vaxtagjöld og eftirstöðvar bifreiðalána færðar í lið 5.5 á
                framtalinu.
              </Text>
              <Text variant="default" marginBottom={2}>
                Fjármögnunar- og rekstrarleigubifreiðir án uppkaupsákvæða í
                samningi eignfærast ekki hjá leigutaka.
              </Text>
              <Text variant="default">
                Beiðni um afskráningu eða leiðréttingu á skráningu bifreiða skal
                beina til Samgöngustofu. Hægt er að nálgast afskráningarbeiðni á
                samgongustofa.is.
              </Text>
            </Box>

            {/* 4.4 Aðrar eignir áður ótaldar */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                4.4 Aðrar eignir áður ótaldar
              </Text>
              <Text variant="default" marginBottom={2}>
                Aðrar ótaldar eignir, sem eru framtalsskyldar, t.d. hjólhýsi,
                tjaldvagn, bátur, vélsleði, vélhjól o.fl., skulu taldar fram á
                kaup- eða kostnaðarverði. Hestar og önnur húsdýr færast samkvæmt
                eignamati í landbúnaði. Hér skal einnig færa rafmynt, svo sem
                Bitcoin, á markaðsverði í árslok. Peningaeign færist í þennan
                kafla og skal færa erlenda mynt á gengi í árslok. Aðrar eignir
                barna færast einnig hér.
              </Text>
              <Text variant="default">
                Beiðni um leiðréttingu á skráningu ökutækja skal komið til
                Samgöngustofu.
              </Text>
            </Box>

            {/* 4.5 Hrein eign samkvæmt efnahagsreikningi */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                4.5 Hrein eign samkvæmt efnahagsreikningi
              </Text>
              <Text variant="default">
                Í reit 01 færist hrein eign 31. des. 2023 samkvæmt
                Samræmingarblaði RSK 4.05 og meðfylgjandi eyðublaði um
                atvinnurekstur (RSK 1.04, 4.10, 4.11 eða 4.08) eftir umfangi og
                eðli rekstrar. Ef hjón eru bæði með eigin atvinnurekstur er
                samtala hreinnar eignar í rekstri þeirra beggja færð í einni
                tölu í þennan reit.
              </Text>
            </Box>

            {/* 4.6 Staðgreiðsla skatts af fjármagnstekjum í eigin atvinnurekstri */}
            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                4.6 Staðgreiðsla skatts af fjármagnstekjum í eigin
                atvinnurekstri
              </Text>
              <Text variant="default" marginBottom={2}>
                Í reit 309 færist staðgreiðsla sem haldið hefur verið eftir af
                fjármagnstekjum, sem mynduðust í atvinnurekstri á árinu 2023
                skv. eyðublaði um atvinnurekstur (RSK 4.10, 1.04, 4.11 eða
                4.08). Ef hjón eru bæði með eigin atvinnurekstur er samtala
                staðgreiðslu af fjármagnstekjum í rekstri þeirra beggja færð í
                einni tölu í þennan reit. Á eyðublöðum um atvinnurekstur færist
                staðgreiðsla af þeim fjármagnstekjum sem stafa af eignum sem
                tilheyra atvinnurekstri. Staðgreiðsla af vöxtum og arði, sem eru
                í atvinnurekstri óviðkomandi, fer í viðeigandi reiti í 3. kafla
                framtals.
              </Text>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

export default EignirOgSkuldirIArslok
