package tashu.api.service;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

import static tashu.api.reoisitory.globalConfig.TASHU_STATION_URL;

@Service
public class StationService {

    @PostConstruct
    public String getStationData() throws Exception {
        System.setProperty("jsse.enableSNIExtension", "false") ;

        Connection conn = Jsoup.connect(TASHU_STATION_URL);
        conn.sslSocketFactory(new CustomSSLSocketFactory());

        Document doc = null;
        String docBody = "";
        try{
            doc = conn.get();
            docBody = doc.body().text();
        }catch(Exception e){
            e.printStackTrace();
        }
        return docBody;
    }
}
