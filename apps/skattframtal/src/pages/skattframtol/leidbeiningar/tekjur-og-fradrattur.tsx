import {
  Box,
  GridColumn,
  GridContainer,
  GridRow,
  Text,
  AlertMessage,
  BulletList,
  Bullet,
  Table as T,
} from '@island.is/island-ui/core'

const TekjurOgFradrattur = () => {
  return (
    <Box marginBottom={[6, 6, 10]}>
      <GridContainer>
        <GridRow>
          <GridColumn
            span={['12/12', '12/12', '12/12', '8/12']}
            offset={['0', '0', '0', '2/12']}
            paddingTop={[4, 4, 6]}
          >
            <Text variant="h1" as="h1" marginBottom={5}>
              Tekjur og frádráttur
            </Text>

            <Box marginBottom={5}>
              <Text variant="default">
                Laun, hlunnindi, starfstengdar greiðslur, styrkir o.fl., eru
                árituð á framtalið samkvæmt innsendum launamiðum. Einnig
                greiðslur frá Tryggingastofnun ríkisins,
                Atvinnuleysistryggingasjóði, Fæðingarorlofssjóði, lífeyrissjóðum
                og ráðstöfun séreignarsparnaðar til íbúðarkaupa. Áritun nær
                einnig til frádráttar vegna iðgjalds í lífeyrissjóð, frádráttar
                vegna viðbótarlífeyrissparnaðar ef sá sparnaður fer í gegnum
                launagreiðanda svo og staðgreiðslu af árituðum launum samkvæmt
                launamiðum. Einnig er eftir atvikum áritaður frádráttur á móti
                íþróttastyrk, námsstyrkjum og samgöngugreiðslum, sem og
                frádráttur vegna gjafa til almannaheillafélaga. Framteljandi
                getur sjálfur þurft að færa frádrátt á móti öðrum tekjuliðum og
                fylla út viðeigandi fylgigögn.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <AlertMessage
                type="info"
                title="Mikilvægt"
                message="Áríðandi er að framteljandi athugi hvort áritaðar fjárhæðir og aðrar upplýsingar séu í samræmi við gögn og upplýsingar sem hann hefur sjálfur undir höndum."
              />
            </Box>

            <Box marginBottom={3}>
              <Text variant="h4" fontWeight="semiBold">
                Leiðrétting áritaðra tekjufjárhæða
              </Text>
              <Text variant="default">
                Fjárhæðir eru leiðréttar með því að yfirskrifa áritaðar
                fjárhæðir með réttum. Leiðréttingu til lækkunar á árituðum
                launatekjum þarf framteljandi að rökstyðja með nauðsynlegum
                gögnum og geta um í athugasemdum í lið 1.4. Hafi framteljandi
                þegið laun sem ekki eru árituð á framtal þarf að bæta þeim
                upplýsingum inn. Jafnframt verður að gæta þess að leiðrétta
                eftir atvikum frádrátt vegna iðgjalda í lífeyrissjóði og
                afdregna staðgreiðslu.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.1 Laun og starfstengdar greiðslur
              </Text>
              <Text variant="default" marginBottom={2}>
                Í þennan lið færast hvers konar launagreiðslur. Séu launin
                ógreidd færast þau einnig sem útistandandi krafa í lið 3.3. Laun
                sem ekki hafa fengist greidd vegna gjaldþrots launagreiðanda
                skal ekki færa til tekna, en gera grein fyrir þeim í
                athugasemdum í lið 1.4. Greiðslur frá Ábyrgðasjóði launa ber að
                telja til tekna á greiðsluárinu. Sé launa aflað erlendis færast
                þau í lið 2.8 í reit 319, sjá nánari skýringar við þann reit.
              </Text>
              <Text variant="default">
                Með launum er, auk beinna launagreiðslna, átt við hvers konar
                starfstengdar greiðslur, svo sem eftirlaun frá vinnuveitanda,
                fargjalda-greiðslur og flutningspeninga, fata-, fæðis-, nestis-
                og verkfærapeninga, fæðingarorlof, húsaleigu- og orkustyrk frá
                launagreiðanda, peningagjafir, risnufé og símastyrk.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.2 Ökutækjastyrkur, dagpeningar og hlunnindi
              </Text>
              <Text variant="h4" fontWeight="semiBold">
                Reitur 22: Ökutækjastyrkur
              </Text>
              <Text variant="default" marginBottom={2}>
                Hér færist ökutækjastyrkur en frádráttur á móti honum í reit 32.
                Sjá skýringar á bls. 28.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 23: Dagpeningar
              </Text>
              <Text variant="default" marginBottom={2}>
                Hér færast dagpeningar en frádráttur á móti þeim í reit 33. Sjá
                skýringar á bls. 21.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 134: Bifreiðahlunnindi
              </Text>
              <Text variant="default" marginBottom={2}>
                Við ákvörðun á fjárhæð bifreiðahlunninda skal miða við verð og
                aldur bifreiðar. Ársumráð bifreiðar í eigu launagreiðanda skulu
                metin til tekna sem hér segir:
              </Text>
              <Box marginBottom={2}>
                <BulletList type="ul" space={2}>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Bifreið keypt 2014 eða síðar:
                      </Text>{' '}
                      28% af kaupverði.
                    </Text>
                  </Bullet>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Bifreið keypt 2013 eða fyrr:
                      </Text>{' '}
                      28% af verði samkvæmt Bifreiðaskrá viðkomandi árs, RSK
                      6.03.
                    </Text>
                  </Bullet>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Bifreið sem ekki er í eigu launagreiðanda:
                      </Text>{' '}
                      28% af verði samkvæmt verðlista bifreiðaumboðs þegar
                      launagreiðandi fær umráð yfir henni, t.d. þann dag sem
                      bifreið er tekin á leigu.
                    </Text>
                  </Bullet>
                </BulletList>
              </Box>
              <Text variant="default" marginBottom={2}>
                Heimilt er að færa verð til útreiknings á bifreiðahlunnindum
                niður um 10% á ári, í fyrsta skipti á árinu eftir kaupár. Það
                getur þó aldrei orðið lægra en 50% af kaupverði. Mánaðarleg
                hlunnindi teljast 1/12 af árshlunnindum fyrir hvern byrjaðan
                mánuð og skal við það miðað ef umráðin vara hluta úr ári. Greiði
                launamaður rekstrarkostnað bifreiðar sem hann hefur umráð yfir
                (eldsneyti, smurningu, þrif o.þ.h.) skal lækka hlutfall
                hlunninda í 22% af verði bifreiðarinnar, eins og það er
                skilgreint hér að framan. Ef rafmagn er eini orkugjafi bifreiðar
                er hlutfallið 27%.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 136: Húsnæðishlunnindi
              </Text>
              <Text variant="default" marginBottom={2}>
                Ef launagreiðandi lætur starfsmanni sínum í té endurgjaldslaus
                afnot íbúðarhúsnæðis skulu þau metin starfsmanni til tekna sem
                hér segir: Árleg afnot skulu metin til tekna sem jafngildi 5% af
                fasteignamati íbúðarhúsnæðisins, þ.m.t. bílskúrs og lóðar. Sú
                fjárhæð er margfölduð með gildistölu þess svæðis þar sem
                húsnæðið er, sbr. eftirfarandi:
              </Text>

              <T.Table
                box={{ marginBottom: 2 }}
                data-testid="husnaedishlunnindi-table"
              >
                <T.Head>
                  <T.Row>
                    <T.HeadData>Gildistala</T.HeadData>
                    <T.HeadData>Staðsetning</T.HeadData>
                  </T.Row>
                </T.Head>
                <T.Body>
                  <T.Row>
                    <T.Data>
                      <Text variant="default">1,0</Text>
                    </T.Data>
                    <T.Data>
                      <Text variant="default">
                        Reykjavík (þar með talið Kjalarnes), Seltjarnarnes,
                        Mosfellsbær, Kópavogur, Garðabær, Hafnarfjörður
                      </Text>
                    </T.Data>
                  </T.Row>
                  <T.Row>
                    <T.Data>
                      <Text variant="default">0,80</Text>
                    </T.Data>
                    <T.Data>
                      <Text variant="default">
                        Grindavík, Suðurnesjabær (Sandgerði og Garður),
                        Reykjanesbær, Vogar, Akranes, Akureyri, Árborg,
                        Hveragerði, Ölfus
                      </Text>
                    </T.Data>
                  </T.Row>
                  <T.Row>
                    <T.Data>
                      <Text variant="default">0,70</Text>
                    </T.Data>
                    <T.Data>
                      <Text variant="default">Önnur sveitarfélög</Text>
                    </T.Data>
                  </T.Row>
                </T.Body>
              </T.Table>

              <Text variant="default" marginBottom={2}>
                Endurgjaldslausa orkunotkun (rafmagn og hita) skal telja til
                tekna á kostnaðarverði. Fylgi starfi launamanns kvöð um búsetu í
                húsnæði sem launagreiðandi lætur honum í té, er ríkisskattstjóra
                heimilt að lækka mat húsnæðishlunninda við álagningu opinberra
                gjalda ef launþegi telst ekki nýta húsnæðið að fullu. Gera má
                grein fyrir þessu í athugasemdareit á forsíðu framtals.
                Íbúðarhúsnæði allt að 150 m² að viðbættum 5 m² fyrir hvern íbúa
                umfram 6 telst fullnýtt.
              </Text>
              <Text variant="default" marginBottom={2}>
                Eigi skal meta til tekna afnot af húsnæði í verbúðum eða
                vinnubúðum þar sem launamaður dvelur um takmarkaðan tíma í
                þjónustu launagreiðanda.
              </Text>
              <Text variant="default" marginBottom={2}>
                Hafi launþegi endurgjaldslaus afnot af orlofshúsnæði frá
                launagreiðanda sínum í fleiri en 10 daga á ári skal telja þau
                til tekna með 4.500 kr. fyrir hvern dag sem umfram er. Það sama
                gildir um slík afnot fjölskyldumeðlims starfsmanns. Með
                orlofshúsnæði er átt við sumarbústaði og annað það húsnæði sem
                ætlað er til slíkrar notkunar, þ.m.t. íbúðir í þéttbýli, sem og
                hjólhýsi, fellihýsi, tjaldvagna og aðra tengivagna.
              </Text>
              <Text variant="default" marginBottom={2}>
                Ekki skal telja til tekna greiðslu frá launagreiðanda eða
                stéttarfélagi sem ætlað er að standa straum af kostnaði við
                leigu á orlofshúnæði eða orlofsdvöl að hámarki 67.000 kr. á ári.
                Skilyrði er að lagðir hafi verið fram fullgildir reikningar
                fyrir greiðslu á kostnaði vegna orlofsdvalarinnar.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 135: Önnur hlunnindi
              </Text>
              <Text variant="default" marginBottom={2}>
                Í þennan reit færist samtala annorra hlunninda. Á það t.d. við
                um undirverð hlutabréfa, fæði, ökutæki önnur en bifreiðir,
                húsnæði, fríar ferðir, áskriftir fjölmiðla, tryggingar, síma,
                tölvur, svo og framlög og gjafir.
              </Text>
              <Box marginBottom={2}>
                <BulletList type="ul" space={2}>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Önnur vélknúin ökutæki:
                      </Text>{' '}
                      Hlunnindi af öðrum vélknúnum ökutækjum eru reiknuð með
                      sambærilegum hætti og hlunnindi af bifreiðum. Sjá nánar í
                      reglum um skattmat vegna tekna manna tekjuárið 2023.
                    </Text>
                  </Bullet>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Einkaflugvélar:
                      </Text>{' '}
                      Færa skal til tekna 268.000 kr. á hvern byrjaðan flugtíma
                      vegna ferða í einkaþágu (27.000 kr. ef um er að ræða
                      litlar eins hreyfils flugvélar).
                    </Text>
                  </Bullet>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Fatahlunnindi:
                      </Text>{' '}
                      Fatahlunnindi skal telja til tekna á kostnaðarverði.
                      Undanþeginn er einkennisfatnaður og nauðsynlegur öryggis-
                      og hlífðarfatnaður sem starfsmenn fá til afnota og er
                      ætlað að nota við störf sín. Það sama á við um fatnað sem
                      er auðkenndur eða merktur launagreiðanda og einkum nýttur
                      vegna starfa fyrir hann.
                    </Text>
                  </Bullet>
                  <Bullet>
                    <Text variant="default" marginBottom={1}>
                      <Text as="span" fontWeight="semiBold">
                        Fæðishlunnindi:
                      </Text>{' '}
                      Fæðishlunnindi færast til tekna í samræmi við hlunnindamat
                      ríkisskattstjóra. Fæði, sem launagreiðandi lætur
                      starfsmanni og fjölskyldu hans í té endurgjaldslaust, skal
                      metið starfsmanninum til tekna með eftirfarandi fjárhæðum.
                      Heimilt er að lækka fjárhæðirnar um fjórðung ef um er að
                      ræða fæði fyrir börn yngri en 12 ára.
                    </Text>
                    <BulletList type="ul" space={1}>
                      <Bullet>Morgunverður. 424 kr.</Bullet>
                      <Bullet>Hádegis- eða kvöldverður... 635 kr.</Bullet>
                      <Bullet>Fullt fæði á dag. 1.693 kr.</Bullet>
                    </BulletList>
                    <Text variant="default" marginTop={1}>
                      Láti launagreiðandi starfsmanni sínum í té fæði á lægra
                      verði en skattmat ríkisskattstjóra segir til um skal telja
                      mismuninn til tekna. Sérhver önnur fæðishlunnindi, sem
                      látin eru launamanni og fjölskyldu hans í té
                      endurgjaldslaust, ber að telja til tekna á kostnaðarverði.
                    </Text>
                  </Bullet>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Lán frá launagreiðanda:
                      </Text>{' '}
                      Fái framteljandi lán frá launagreiðanda sínum, eða fyrir
                      milligöngu hans, sem bera lægri vexti en þá sem birtir eru
                      af Seðlabanka Íslands, skal telja mismuninn til
                      skattskyldra tekna. Sjá töflu um &quot;bankavexti og
                      dráttarvexti&quot; á vefsíðu bankans, sedlabanki.is. Sama
                      á við um greiðslufresti og afborganir af kaupum á
                      hlutabréfum eða öðrum eignum.
                    </Text>
                  </Bullet>
                  <Bullet>
                    <Text variant="default">
                      <Text as="span" fontWeight="semiBold">
                        Hlutabréf á undirverði:
                      </Text>{' '}
                      Hafi framteljandi keypt hlutabréf á undirverði, samkvæmt
                      kauprétti sem hann hefur öðlast vegna starfa sinna, telst
                      munurinn á kaupverði og gangverði til skattskyldra tekna.
                      Undirverðið á að skrá á hlutabréfablaðið RSK 3.19 og skal
                      færa til tekna á því ári þegar eigendaskipti verða á
                      hlutabréfunum. Þetta á þó ekki við um bréf sem keypt eru
                      samkvæmt kaupréttaráætlun sem ríkisskattstjóri hefur
                      staðfest. Sjá bls. 25.
                    </Text>
                  </Bullet>
                </BulletList>
              </Box>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.3 Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar
                bótagreiðslur, styrkir o.fl.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 40: Greiðslur frá TR
              </Text>
              <Text variant="default" marginBottom={1}>
                Eftirtaldar greiðslur frá Tryggingastofnun eru áritaðar í reit
                40 á framtali.
              </Text>
              <Box marginBottom={2}>
                <BulletList type="ul" space={1}>
                  <Bullet>Dánarbætur.</Bullet>
                  <Bullet>Ellilífeyrir.</Bullet>
                  <Bullet>Endurhæfingarlífeyrir.</Bullet>
                  <Bullet>
                    Foreldragreiðslur (fjárhagsaðstoð/ grunngreiðslur).
                  </Bullet>
                  <Bullet>Heimilisuppbót.</Bullet>
                  <Bullet>Maka- og umönnunarbætur.</Bullet>
                  <Bullet>Mæðra- og feðralaun.</Bullet>
                  <Bullet>Orlofs- og desemberuppbætur.</Bullet>
                  <Bullet>Ráðstöfunarfé.</Bullet>
                  <Bullet>Tekjutrygging.</Bullet>
                  <Bullet>Uppbætur á lífeyri vegna kostnaðar.</Bullet>
                  <Bullet>Örorkulífeyrir og örorkustyrkur.</Bullet>
                  <Bullet>
                    Örorkulífeyrir vegna slysa. Sé hann vegna barna yngri en 16
                    ára telst hann sem tekjur hjá framfæranda og skiptist þá
                    jafnt ef um hjón eða sambúðarfólk er að ræða.
                  </Bullet>
                </BulletList>
              </Box>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 43: Lífeyrisgreiðslur og barnalífeyrir
              </Text>
              <Text variant="default" marginBottom={2}>
                Hér færast allar lífeyrisgreiðslur frá lífeyrissjóðum. Athugið
                þó að ef barn hefur misst annað eða bæði foreldri og er
                skattlagt sérstaklega af öðrum tekjum en launatekjum, færist
                barnalífeyrir á sérframtal þess.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 140: Lífeyrisgreiðslur úr séreignarsjóðum
              </Text>
              <Text variant="default" marginBottom={2}></Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 143: Sérstök útgreiðsla séreignarsparnaðar
              </Text>
              <Text variant="default" marginBottom={2}>
                Hér færast greiðslur úr séreignarsjóðum sem heimilaðar voru árið
                2023 vegna heimsfaraldurs kórónaveiru.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 145: Lífeyrisgreiðslur úr &quot;sérstökum&quot;
                séreignarsjóðum
              </Text>
              <Text variant="default" marginBottom={2}></Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 163: Atvinnuleysisbætur
              </Text>
              <Text variant="default" marginBottom={2}></Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 197: Styrkir og bætur frá sveitarfélögum
              </Text>
              <Text variant="default" marginBottom={2}></Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 131: Styrkir til náms, rannsókna- og vísindastarfa
              </Text>
              <Text variant="default" marginBottom={2}>
                Hér á m.a. að færa endurmenntunar- og starfsmenntunarstyrki. Sjá
                einnig umfjöllun um reit 149, undir lið 2.6.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 243: Skattskyld útborgun úr séreignarsjóði vegna
                íbúðarkaupa
              </Text>
              <Text variant="default" marginBottom={2}>
                Fari útborgunin yfir þau mörk sem heimilt er að ráðstafa
                skattfrjálst telst það sem umfram er til skattskyldra tekna og
                fer í þennan reit. Skattfrjáls ráðstöfun fer í reiti 443/444 eða
                445/446.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 96: Aðrar greiðslur
              </Text>
              <Box marginBottom={2}>
                <BulletList type="ul" space={1}>
                  <Bullet>
                    Barnsmeðlög að því marki sem þau eru umfram fjárhæð tvöfalds
                    barnalífeyris.
                  </Bullet>
                  <Bullet>Björgunarlaun.</Bullet>
                  <Bullet>
                    Dagvistunargreiðslur. Dagforeldri. Greiðslur frá
                    sveitarfélögum til dagforeldra vegna þeirra eigin barna
                    færast hér. Endurgreiðsla sveitarfélaga til foreldra vegna
                    vistunar barna hjá dagforeldrum telst ekki til tekna hjá
                    foreldrum og færist ekki á framtal.
                  </Bullet>
                  <Bullet>Dvalar- og ferðastyrkir.</Bullet>
                  <Bullet>
                    Eigin vinna við íbúðarhúsnæði unnin í venjulegum vinnutíma
                    skal metin til tekna og færð í þennan reit. Sama á við um
                    skiptivinnu, gjafavinnu og eigin vinnu við aðrar fasteignir
                    en íbúðarhúsnæði, s.s. sumarbústaði. Eigin vinna við
                    íbúðarhúsnæði sem unnin er utan venjulegs vinnutíma er
                    skattfrjáls. Gera skal grein fyrir eigin vinnu á
                    Húsbyggingarskýrslu RSK 3.03, sjá nánar á bls. 23.
                  </Bullet>
                  <Bullet>Framfærslulífeyrir foreldris.</Bullet>
                  <Bullet>
                    Framfærslulífeyrir frá fyrrverandi maka að því marki sem
                    hann er umfram 698.664 kr. á ári.
                  </Bullet>
                  <Bullet>Fæðingarstyrkur.</Bullet>
                  <Bullet>
                    Gjafir, þó ekki tækifærisgjafir ef verðmæti þeirra er ekki
                    meira en gerist almennt um slíkar gjafir.
                  </Bullet>
                  <Bullet>
                    Greiðslur frá sveitarfélögum vegna fósturbarna sem sett eru
                    í fóstur af opinberum aðilum, sjá nánar á bls. 29.
                  </Bullet>
                  <Bullet>
                    Greiðslur fyrir vistun aldraðra eða öryrkja í heimahúsum,
                    sjá nánar á bls. 29.
                  </Bullet>
                  <Bullet>
                    Greiðslur til stuðningsfjölskyldna fatlaðra barna, sjá nánar
                    á bls. 29.
                  </Bullet>
                  <Bullet>
                    Happdrættisvinningar. Skattskyldir happdrættisvinningar
                    færast hér, en skattfrjálsir færast í 2.9 B, í reit 597. Sjá
                    töflu á bls. 11.
                  </Bullet>
                  <Bullet>
                    Höfundarlaun önnur en vegna síðari afnota, listamannalaun,
                    heiðurslaun, heiðursverðlaun. Skattskyld heiðursverðlaun
                    skal færa hér en skattfrjáls í 2.9 C í reit 73, sjá
                    skýringar við þann reit á bls. 11.
                  </Bullet>
                  <Bullet>
                    Laun frá alþjóðastofnun færast hér í þeim tilvikum þar sem í
                    samningum sem Ísland hefur gert við önnur ríki er
                    sérstaklega kveðið á um skattfrelsi. Sé svo ekki færast
                    launin í 2.1. Óska þarf sérstaklega eftir skattfrelsi með
                    athugasemd í kafla 1.4.
                  </Bullet>
                  <Bullet>
                    Samgöngugreiðslur. Greiðsla launagreiðanda á kostnaði vegna
                    ferða milli heimilis og vinnustaðar eða ferða í þágu
                    launagreiðanda, ef nýttar eru almenningssamgöngur eða
                    vistvænn samgöngumáti. Leyfilegur frádráttur er áritaður í
                    reit 157 í vefframtali, að hámarki 120.000 kr. á ári, eða
                    10.000 kr. á mánuði miðað við fullt starf.
                  </Bullet>
                  <Bullet>Sjúkra- og slysadagpeningar frá öðrum en TR.</Bullet>
                  <Bullet>
                    Skattskyldar greiðslur frá Sjúkratryggingum Íslands.
                  </Bullet>
                  <Bullet>
                    Staðaruppbót vegna starfa erlendis í þjónustu íslenska
                    ríkisins.
                  </Bullet>
                  <Bullet>
                    Styrkir úr styrktar- og sjúkrasjóðum stéttarfélaga svo sem
                    vegna gleraugnakaupa, heyrnartækjakaupa, glasafrjóvgunar,
                    krabbameinsskoðunar, ættleiðinga, tannviðgerða,
                    sjúkraþjálfunar, sálfræðiþjónustu, dvalar á heilsustofnunum
                    og útfarar.
                  </Bullet>
                  <Bullet>
                    Styrkir til líkamsræktar frá launagreiðendum og
                    stéttarfélögum færast til tekna hér en heimilt er að færa
                    kostnað til frádráttar að hámarki 71.500 kr. í reit 157. Á
                    vefframtali er þessi frádráttur að öllu jöfnu áritaður.
                  </Bullet>
                  <Bullet>
                    Aðrir styrkir, svo sem til íþróttamanna, sjálfboðaliða við
                    lyfjatilraunir, útfararstyrkir og verkfallsstyrkir.
                    Vinningar í veðmáli eða keppni.
                  </Bullet>
                  <Bullet>
                    Ættleiðingarstyrkir; kostnaður á móti styrk frá
                    Vinnumálastofnun heimilast til frádráttar í reit 157.
                  </Bullet>
                </BulletList>
              </Box>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.4 Reiknað endurgjald
              </Text>
              <Text variant="default">
                Í reit 24 færist reiknað endurgjald vegna vinnu við eigin
                atvinnurekstur, atvinnurekstur maka eða í sameignarfélagi sem
                ekki er sjálfstæður skattaðili. Sé það lægra en staðgreiðsla
                hefur miðast við skal láta skýringar fylgja í samræmingarblaði
                með rekstrarskýrslu eða rekstrarframtali. Reiknað endurgjald sem
                er innan þeirra marka sem halda mátti utan staðgreiðslu færist
                einnig hér.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.5 Hreinar tekjur af eigin atvinnurekstri
              </Text>
              <Text variant="default">
                Hreinar tekjur af atvinnurekstri samkvæmt Samræmingarblaði RSK
                4.05 og rekstrarskýrslu (sjá bls. 19), sem fylgja á framtalinu,
                færast í reit 62. Ef um tap er að ræða færist engin fjárhæð í
                þennan reit. Hjá hjónum færast hreinar tekjur hjá því hjóna sem
                stendur fyrir rekstrinum.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.6 Frádráttur frá tekjum
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 32: Ökutækjastyrkur
              </Text>
              <Text variant="default" marginBottom={2}>
                Frádrátt á móti ökutækjastyrk og endurgreiddum bifreiðakostnaði
                ber að færa í þennan reit. Fylla skal út eyðublaðið
                Ökutækjastyrkur RSK 3.04, sjá bls. 28.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 33: Dagpeningar
              </Text>
              <Text variant="default" marginBottom={2}>
                Frádrátt á móti dagpeningum ber að færa í þennan reit. Fylla
                skal út eyðublaðið Dagpeningar RSK 3.11, sjá bls. 21.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitir 162 og 160: lðgjöld í lífeyrissjóði
              </Text>
              <Text variant="default" marginBottom={2}>
                Í reit 162 færist iðgjald í lífeyrissjóð sem innt hefur verið af
                hendi á árinu og í reit 160 iðgjald í séreignarlífeyrissjóð.
                Samanlögð fjárhæð í reitum 160 og 162 á framtali takmarkast við
                frádráttarbært iðgjald, sem er 8% af heildarlaunum. Þetta á við
                þótt hærri fjárhæð kunni að hafa verið greidd í lífeyrissjóði.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 149: Frádráttur á móti náms-, rannsóknar- og
                vísindastyrkjum
              </Text>
              <Text variant="default" marginBottom={2}>
                Ef gerð er krafa um frádrátt vegna kostnaðar á móti náms-,
                rannsóknar- eða vísindastyrkjum, skal gera sundurliðaða grein
                fyrir honum á sérstöku yfirliti sem fylgir framtalinu.
                Heildarkostnaður færist af því í reit 149. Frádrátturinn getur
                ekki orðið hærri en styrkur sem talinn er til tekna í reit 131 í
                kafla 2.3. Heimilt er að draga frá beinan kostnað, þó ekki vexti
                af skuldum, afföll, gengistöp og fyrningu eigna eða persónulegan
                kostnað. Kaupverð tækja, s.s. tölvubúnaðar, er heldur ekki
                frádráttarbært. Ef um atvinnurekstur er að ræða skal færa tekjur
                og frádrátt á RSK 4.10, eða RSK 4.11 ef rekstrartekjur eru hærri
                en 2.000.000 kr.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 157: Frádráttur frá öðrum styrkjum og starfstengdum
                greiðslum
              </Text>
              <Text variant="default" marginBottom={2}>
                Ef gerð er krafa um frádrátt vegna kostnaðar á móti styrkjum til
                sérstakra verkefna eða starfstengdum greiðslum, án þess að um
                atvinnurekstur sé að ræða, skal gera sundurliðaða grein fyrir
                honum á sérstöku yfirliti sem fylgir framtalinu.
                Heildarkostnaður færist af því í reit 157. Frádrátturinn getur
                ekki orðið hærri en móttekin greiðsla. Kostnaður á móti
                tekjufærðum ættleiðingarstyrk frá Vinnumálastofnun færist hér.
                Einnig frádráttur á móti samgöngugreiðslum, sem getur mestur
                orðið 120.000 kr. og kostnaður vegna líkamsræktar, að hámarki
                71.500 kr. Frádráttur heimilast ekki á móti styrkjum vegna
                persónulegra útgjalda, s.s. vegna gleraugna, heyrnartækja,
                glasafrjóvgunar, krabbameinsskoðunar, ættleiðinga, tannviðgerða,
                sálfræðiþjónustu, dvalar á heilsustofnunum og útfarar. Athugið
                að hægt er að sækja um ívilnun vegna útfararkostnaðar og vegna
                veikinda. Sjá bls. 27.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitur 155: Frádráttarbærar gjafir til almannaheillafélaga
              </Text>
              <Text variant="default" marginBottom={2}>
                Í þennan reit færist frádráttur vegna gjafa og framlaga til
                félaga sem hafa með höndum starfsemi til almannaheilla, að
                lágmarki samtals 10.000 kr. og allt að hámarki samtals 350.000.
                kr. á almanaksári. Heimil frádráttarfjárhæð er árituð í reitinn.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.7 Stofn til útreiknings tekjuskatts og útsvars
              </Text>
              <Text variant="default">
                Samtala liða 2.1 til 2.5 að frádreginni fjárhæð í lið 2.6.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.8 Tekjur erlendis, aðrar en fjármagnstekjur
              </Text>
              <Text variant="default" marginBottom={2}>
                Undir þennan lið skal færa launatekjur og lífeyri, sem
                framteljandi aflaði erlendis á árinu, á meðan hann var
                heimilisfastur á Íslandi. Gefa skal upp í hvaða landi teknanna
                var aflað og fjárhæð þeirra í erlendri mynt sem umreikna skal
                síðan í íslenskar krónur á meðalgengi þess tímabils þegar
                teknanna var aflað. Sú fjárhæð færist síðan í reit 319. Gera
                skal grein fyrir greiddum sköttum erlendis. Fjárhæðina skal færa
                í erlendri mynt.
              </Text>
              <Text variant="default" marginBottom={2}>
                Varðandi aðrar tekjur en launatekjur og lífeyri, sjá bls. 30 um
                aðrar tekjur erlendis.
              </Text>
              <Text variant="default" marginBottom={2}>
                Hafi tekna verið aflað erlendis, áður en framteljandi varð
                heimilisfastur hér á landi, skal ekki færa þær tekjur undir
                þennan lið.
              </Text>
              <Text variant="default">
                Hafi tekjur verið áritaðar þrátt fyrir að framteljandi hafi
                verið búsettur erlendis allt tekjuárið skulu þær strikaðar út.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.9 Skattfrjálsar tekjur
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                A: Reitur 596: Skattfrjálsar greiðslur frá Tryggingastofnun og
                Sjúkratryggingum Íslands
              </Text>
              <Box marginBottom={2}>
                <BulletList type="ul" space={1}>
                  <Bullet>
                    Barnalífeyrir, barnsmeðlag og menntunarmeðlag.
                  </Bullet>
                  <Bullet>Bifreiðakaupastyrkur.</Bullet>
                  <Bullet>Dánarbætur vegna slysa.</Bullet>
                  <Bullet>Sérstök uppbót á lífeyri vegna framfærslu.</Bullet>
                  <Bullet>Skattfrjáls sjúklingatrygging.</Bullet>
                  <Bullet>
                    Styrkur til kaupa á sérfæði vegna hamlaðrar líkamsstarfsemi.
                  </Bullet>
                  <Bullet>
                    Umönnunargreiðslur vegna fatlaðra og langveikra barna.
                  </Bullet>
                  <Bullet>Uppbót vegna reksturs bifreiðar.</Bullet>
                  <Bullet>Örorkubætur vegna varanlegrar örorku.</Bullet>
                </BulletList>
              </Box>

              <Text variant="h4" fontWeight="semiBold">
                B: Reitur 597: Vinningar, verðlaun
              </Text>
              <Text variant="default" marginBottom={1}>
                Skattfrjálsir happdrættisvinningar færast hér.
              </Text>
              <Text variant="default" marginBottom={1}>
                Eftirtalin happdrætti höfðu heimild til greiðslu skattfrjálsra
                vinninga á árinu 2023:
              </Text>
              <Box marginBottom={2}>
                <BulletList type="ul" space={1}>
                  <Bullet>Happdrætti DAS</Bullet>
                  <Bullet>Happdrætti Háskóla Íslands</Bullet>
                  <Bullet>Happdrætti Blindrafélagsins</Bullet>
                  <Bullet>Happdrætti Félags heyrnarlausra</Bullet>
                  <Bullet>Happdrætti Gigtarfélags Íslands</Bullet>
                  <Bullet>
                    Happdrætti Krabbameinsfélags höfuðborgarsvæðisins
                  </Bullet>
                  <Bullet>Happdrætti Lionsklúbbs Njarðvíkur</Bullet>
                  <Bullet>
                    Happdrætti Sjálfsbjargar, landsamband hreyfihamlaðra
                  </Bullet>
                  <Bullet>Happdrætti Styrktarfélags lamaðra og fatlaðra</Bullet>
                  <Bullet>Íslensk getspá</Bullet>
                  <Bullet>Íslenskar getraunir</Bullet>
                  <Bullet>Vöruhappdrætti S.Í.B.S.</Bullet>
                </BulletList>
              </Box>
              <Text variant="default" marginBottom={2}>
                Happdrættisvinningar á Evrópska efnahagssvæðinu geta verið
                skattfrjálsir. Framteljandi þarf að leggja fram fullnægjandi
                gögn varðandi happdrættið, en gerðar eru sömu kröfur til
                erlendra happdrætta og íslenskra.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                C: reitur 73: Aðrar skattfrjálsar greiðslur
              </Text>
              <Box marginBottom={2}>
                <BulletList type="ul" space={1}>
                  <Bullet>
                    Dánarbætur sem ákveðnar eru og greiddar í einu lagi.
                  </Bullet>
                  <Bullet>
                    Dvalar- og ferðastyrkir til jöfnunar á námskostnaði.
                  </Bullet>
                  <Bullet>
                    Heiðurslaun - heiðursverðlaun sem eru skattfrjáls skv.
                    lögum, t.d. bókmennta-, tónlistar- og umhverfisverðlaun
                    Norðurlandaráðs ásamt norrænu leikskáldaverðlaununum.
                  </Bullet>
                  <Bullet>
                    Húsnæðisbætur frá HMS og sérstakur húsnæðisstuðningur
                    sveitarfélaga.
                  </Bullet>
                  <Bullet>
                    Miskabætur og skaðabætur, greiddar vegna eignatjóns eða sem
                    eingreiðsla vegna varanlegrar örorku.
                  </Bullet>
                  <Bullet>
                    Styrkir. Olíustyrkur, styrkur til tækjakaupa fatlaðra og
                    styrkur úr húsfriðunarsjóði.
                  </Bullet>
                  <Bullet>
                    Styrkir til foreldra frá sveitarfélögum til að annast barn
                    heima. Hér er átt við svokallaðar heimagreiðslur sem koma í
                    stað niðurgreiðslu á dagvistun.
                  </Bullet>
                  <Bullet>
                    Styrkir og samskotafé vegna veikinda eða slysa.
                  </Bullet>
                  <Bullet>Úttekt úr samlags- og sameignarfélögum.</Bullet>
                </BulletList>
              </Box>

              <Text variant="h4" fontWeight="semiBold">
                Reitir 443/444: Skattfrjáls ráðstöfun eða úttekt úr
                séreignarsjóði vegna íbúðarkaupa
              </Text>
              <Text variant="default" marginBottom={2}>
                Skattfrjáls ráðstöfun séreignarsparnaðar, til greiðslu
                húsnæðislána og húsnæðissparnaðar, er færð í reit 443 og
                skattfrjáls úttekt á uppsafnaðri heimild í reit 444. Fari
                fjárhæðir yfir þau mörk, sem heimilt er að ráðstafa
                skattfrjálst, telst það sem umfram er til skattskyldra tekna og
                fer í reit 243 í kafla 2.3.
              </Text>

              <Text variant="h4" fontWeight="semiBold">
                Reitir 445/446: Fyrsta íbúð
              </Text>
              <Text variant="default" marginBottom={2}>
                Skattfrjáls ráðstöfun séreignarsparnaðar, samkvæmt lögum um
                stuðning til kaupa á fyrstu íbúð, er færð í reit 445 og
                skattfrjáls úttekt á uppsafnaðri heimild í reit 446. Fari
                fjárhæðir yfir þau mörk, sem heimilt er að ráðstafa
                skattfrjálst, telst það sem umfram er til skattskyldra tekna og
                fer í reit 243 í kafla 2.3.
              </Text>
            </Box>

            <Box marginBottom={5}>
              <Text variant="h3" as="h2" marginBottom={2}>
                2.10 Staðgreiðsla af launum
              </Text>
              <Text variant="default">
                Í reit 296 eru áritaðar af launamiðum upplýsingar um
                staðgreiðslu af þeim launum sem eru árituð á framtal. Ef um er
                að ræða staðgreiðslu af launum sem ekki eru árituð þarf
                framteljandi að bæta þeirri fjárhæð við. Hér skal einnig færa
                staðgreiðslu sem skilað var af reiknuðu endurgjaldi og aðra
                staðgreiðslu sem greidd var samkvæmt 38. grein
                staðgreiðslulaganna, en þær fjárhæðir eru ekki áritaðar. Athugið
                að hér á ekki að færa staðgreiðslu af vaxtatekjum og arði.
              </Text>
            </Box>
          </GridColumn>
        </GridRow>
      </GridContainer>
    </Box>
  )
}

export default TekjurOgFradrattur
