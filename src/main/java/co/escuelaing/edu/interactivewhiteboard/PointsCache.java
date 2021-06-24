/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.escuelaing.edu.interactivewhiteboard;

/**
 *
 * @author Andrew
 */
public class PointsCache {
    private static PointsCache _instance = new PointsCache();
    private PointsCache(){}
    public static PointsCache getInstance(){
        return _instance;
    }
    
}
