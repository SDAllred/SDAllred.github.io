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



        if(data != "") {

            $("#NoData").html("");
            $("#SchoolName").html(data.INSTNM);

            $("#SchoolDetails").html( data.CITY + ", " + data.STABBR + "<br>" + "Webpage: " + data.INSTURL);

            if(data.MENONLY == "1"){
                $("#MenWomen").html("Men Only School");
            }

            if(data.WOMENONLY == "1"){
                $("#MenWomen").html("Women Only School");
            }


            if(data.main == "0"){
                $("#Satellite").html("Campus Type: Satellite Campus");
            } else {
                $("#Satellite").html("Campus Type: Main Campus");
            }


            if(data.DISTANCEONLY == "0"){
                $("#Online").html("Online Classes Only: No");
            } else {
                $("#Online").html("Online Classes Only: Yes");
            }


            if(data.ADM_RATE == "NULL"){
                $("#AdminRate").html("Admission Rate: No Data");
            } else{
                $("#AdminRate").html("Admission Rate: " + data.ADM_RATE);
            }

            if(data.UGDS == "NULL"){
                $("#Pop").html("Undergraduate Population: Unknown");
            } else{
                $("#Pop").html("Undergraduate Population: " + data.UGDS);
            }



            if(data.TUITIONFEE_IN == "NULL"){
                $("#InState").html("In-State Tuition: Unknown");
            } else{
                $("#InState").html("In-State Tuition: $" + data.TUITIONFEE_IN);
            }

            if(data.TUITIONFEE_OUT == "NULL"){
                $("#OutState").html("Out-of-State Tuition: Unknown");
            } else{
                $("#OutState").html("Out-of-State Tuition: $" + data.TUITIONFEE_OUT);
            }

            if(data.COSTT4_A == "NULL"){
                if(data.COSTT4_P != "NULL") {
                    $("#AvCost").html("Average Cost of Attendance: $" + data.COSTT4_P);
                } else {
                    $("#AvCost").html("Average Cost of Attendance: Unknown");
                }
            } else{
                $("#AvCost").html("Average Cost of Attendance: $" + data.COSTT4_A);
            }


            if(data.PCTPELL == "NULL"){
                $("#Pell").html("Percent of Undergraduates with Pell Grants: Unknown");
            } else{
                $("#Pell").html("Percent of Undergraduates with Pell Grants: " + data.PCTPELL);
            }

            if(data.PCTFLOAN == "NULL"){
                $("#Loan").html("Percent of Undergraduates with Federal Student Loans: Unknown");
            } else{
                $("#Loan").html("Percent of Undergraduates with Federal Student Loans: " + data.PCTFLOAN);
            }

            if(data.GRAD_DEBT_MDN_SUPP == "NULL" || data.GRAD_DEBT_MDN_SUPP == "PrivacySuppressed" ){
                $("#Debt").html("Median Debt of Graduates: Unknown");
            } else{
                $("#Debt").html("Median Debt of Graduates: $" + data.GRAD_DEBT_MDN_SUPP);
            }

            if(data.md_earn_wne_p10 == "NULL"){
                $("#Earn").html("Median Earnings of Graduates 10 Years After College: Unknown");
            } else{
                $("#Earn").html("Median Earnings of Graduates 10 Years After College: $" + data.md_earn_wne_p10);
            }


            if(data.ACTCMMID == "NULL"){
                $("#Act").html("Median ACT Score Admitted: Unknown");
            } else{
                $("#Act").html("Median ACT Score Admitted: $" + data.ACTCMMID);
            }

            if(data.SAT_AVG == "NULL"){
                $("#Sat").html("Mean SAT Score Admitted: Unknown");
            } else{
                $("#Sat").html("Mean SAT Score Admitted: $" + data.SAT_AVG);
            }

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