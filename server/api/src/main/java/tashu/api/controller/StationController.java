package tashu.api.controller;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.*;
import tashu.api.service.StationService;

@RestController
@RequestMapping("/station")
public class StationController {

    private JSONObject stationInfo;

    @ResponseBody
    @GetMapping(value = "")
    public String station(){
        StationService stationService = new StationService();
        String stationDataStr = "";
        System.out.println("@@ /station call");
        try{
            stationDataStr = stationService.getStationData();
//            JSONParser parser = new JSONParser();
//            stationInfo = (JSONObject) parser.parse(stationDataStr);
        }catch (Exception e){
            e.printStackTrace();
        }
        return stationDataStr;
    }

//
//    // (id는 대여소 번호)
//    // TODO: POST, /station/{id}            id에 해당하는 대여소 정보
//    @ResponseBody
//    @PostMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
//    public JSONObject stationId(@PathVariable int id){
//        RestTemplate restTemplate = new RestTemplate();
//        return new JSONObject();
//    }

        // TODO: POST, /station/{id}/location   id에 해당하는 대여소 위치
    // TODO: POST, /station/{id}/bikes      id에 해당하는 대여소의 자전거 대여 현황

}
