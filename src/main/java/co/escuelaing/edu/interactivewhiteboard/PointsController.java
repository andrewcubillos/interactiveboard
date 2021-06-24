/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.escuelaing.edu.interactivewhiteboard;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PointsController {
    private PointsCache points = PointsCache.getInstance();
    @PostMapping("/points")
    public String processPoints(@RequestBody String points){
        System.out.println("payload:" + points);
        return points;
    }
}
