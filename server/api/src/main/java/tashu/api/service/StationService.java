package tashu.api.service;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

import static tashu.api.repository.globalConfig.TASHU_STATION_URL;

@Service
public class StationService {
    /**
     * server에서 데이터를 전송할 땐 client에서 필요한 모든 정보를 보낸다.
     * client에서는 정보를 저장하고 있다가 필요할 때 바로 보여준다.
     */

    private static Station station = new Station();
    private static LocalDateTime _last_update = null;
    private long _update_gap = 10;

    /**
     * station_info
     * {"markers":[
     *      {
     *          "dong":"도룡동",
     *          "cntPrtRack":"0", -- remove
     *          "percent":"21",
     *          "name":"무역전시관입구(택시승강장)",
     *          "kiosk_no":"1",
     *          "imgFile":"\/html\/images\/station\/9D208000000001.jpg", -- remove
     *          "gu":"유성구",
     *          "lng":"127.386131",
     *          "cntRentable":"3",
     *          "lat":"36.374580",
     *          "cntLockOff":"7",
     *          "cntRackTotal":"14"
     *       },...
     * ]}
     */
    @PostConstruct
    public String getStationData() throws Exception{
        /*
          첫 업데이트이거나 마지막 업데이트 이후로 sec초 이상 지났으면 갱신한다.
         */
        LocalDateTime nowTime = LocalDateTime.now();
        if(_last_update == null || _last_update.isBefore(nowTime.minusSeconds(_update_gap))){
            _updateStationData();
            _last_update = nowTime;
        }else {
            System.out.println("updated: "+_last_update);
            System.out.println("now: "+nowTime.toString());
        }
        return station.toString();
    }

    private void _updateStationData() throws Exception {
        System.out.println("_updateStationData call @@");
        System.setProperty("jsse.enableSNIExtension", "false");

        Connection conn = Jsoup.connect(TASHU_STATION_URL);
        CustomSSLSocketFactory.setSSL();

        Document doc;
        String docBody;
        try {
            doc = conn.get();
            docBody = doc.body().text();
            station.setData(docBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
