/**
 * Created by sierra on 12/4/15.
 */
/*globals alert, document, d3, console*/

var Selected = function(cVis) {

    this.cVis = cVis;


        // build the graph
    //buildInfo(null);



    // this builds the graph.
    // id = the id of the svg
    // data = this is what is going to be displayed. each element needs the attributes .INSTNM and .Data
    // widthT , heightT - height and width of the svg
    this.buildInfo = function(data)
    {

        if(data == null) {

            $("#NoData").html(data.INSTNM);

        }

        //
        //// the data binding
        //var text = svg.selectAll("p")
        //    .data(data);
        //
        //
        //
        //// how do we handle new elements?
        //// we start with a transparent gray bar of width 0
        //bars.enter().append("p")
        //    .attr("x", 0)
        //    .attr("y", height)
        //    .attr("width", 0)
        //    .attr("height", 0)
        //    .attr("opacity", 0)
        //    .classed("bars", true);
        //



    }
}