package tashu.api.service;

import java.util.Iterator;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@SuppressWarnings("unchecked")
public class Station {
    /**
     * stations : JSONArray
     * [ {
     *     "address": gu + dong,
     *     "name": name,
     *     "kiosk_no": kiosk_no,
     *     "location": [lat, lng],
     *     "bikes": {
     *         "cntRentable": cntRentable,
     *         "cntLockOff": cntLockOff,
     *         "cntRackTotal": cntRackTotal
     *     }
     * }, {}...]
     */
    private JSONArray stations;

    protected Station(){
        init();
    }

    private void init() {
        this.stations = new JSONArray();
        JSONObject station = new JSONObject();
        station.put("address", "");
        station.put("name", "");
        station.put("kiosk_no", "");
        station.put("location", "");
        station.put("bikes", "");
        this.stations.add(station);
    }

    protected void setData(String string) throws Exception{
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject)parser.parse(string);
        JSONArray raw_station_info = (JSONArray) jsonObject.get("markers");
        this.stations = new JSONArray();

        Iterator raw_station_it = raw_station_info.iterator();
        while (raw_station_it.hasNext()) {
            Object o = raw_station_it.next();
            JSONObject raw_station = (JSONObject) o;
            JSONObject station = new JSONObject();
            String address = raw_station.get("gu").toString() + raw_station.get("dong").toString();
            JSONArray location = new JSONArray();
            location.add(raw_station.get("lat").toString()); // 위도
            location.add(raw_station.get("lng").toString()); // 경도
            JSONObject bikes = new JSONObject();
            bikes.put("cntRentable", raw_station.get("cntRentable"));
            bikes.put("cntLockOff", raw_station.get("cntLockOff"));
            bikes.put("cntRackTotal", raw_station.get("cntRackTotal"));

            station.put("address", address);
            station.put("name", raw_station.get("name").toString());
            station.put("kiosk_no", raw_station.get("kiosk_no").toString());
            station.put("location", location);
            station.put("bikes", bikes);

            stations.add(station);
        }
    }

    @Override
    public String toString(){
        return stations.toJSONString();
    }

}
