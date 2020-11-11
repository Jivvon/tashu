package tashu.api;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.IOException;

public class DemoApplicationTests {

    @Test
    public void jsoup() {
        Document doc = null;
        try {
            var response = Jsoup.connect("https://www.tashu.or.kr/mapAction.do?process=statusMapView")
                    .timeout(5000)
                    .execute();

            if (response.statusCode() == 200) {
                doc = response.parse();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(doc.body().text());
    }
}
