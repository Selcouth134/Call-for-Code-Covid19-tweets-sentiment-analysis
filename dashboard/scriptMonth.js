let monthly_data = [
    {
        positive: 0,
        negative: 0,
        neutral: 0
    },
    {
        positive: 0,
        negative: 0,
        neutral: 0
    },
    {
        positive: 0,
        negative: 0,
        neutral: 0
    },
    {
        positive: 0,
        negative: 0,
        neutral: 0
    }
]

let monthly_polarity = [
    {
        positive: 0,
        negative: 0,
        neutral: 0
    },
    {
        positive: 0,
        negative: 0,
        neutral: 0
    },
    {
        positive: 0,
        negative: 0,
        neutral: 0
    },
    {
        positive: 0,
        negative: 0,
        neutral: 0
    }
]

getCSV();

async function getCSV() {
    const response = await fetch('analyzedData/month-wise.csv');
    const CSVdata = await response.text();

    const table = CSVdata.split('\n').slice(1);
    console.log(table);

    parseData(table);

    //take avearages
    let total_march = (monthly_data[0].positive +
        monthly_data[0].negative +
        monthly_data[0].neutral)
    
    let total_april = (monthly_data[1].positive +
        monthly_data[1].negative +
        monthly_data[1].neutral)

    let total_may = (monthly_data[2].positive +
        monthly_data[2].negative +
        monthly_data[2].neutral)

    let total_june = (monthly_data[3].positive +
        monthly_data[3].negative +
        monthly_data[3].neutral)
    
    let total_months = [total_march, total_april, total_may, total_june]

    for(let i=0; i<4; i++) {
        monthly_data[i].positive = Math.ceil( 
                (monthly_data[i].positive/total_months[i])*1000
            );
        monthly_data[i].negative = Math.ceil( 
                (monthly_data[i].negative/total_months[i])*1000
            );
        monthly_data[i].neutral = Math.ceil( 
                (monthly_data[i].neutral/total_months[i])*1000
            );
    }

    console.log(monthly_data);

    new Chart(document.getElementById("line-chart"), {
        type: 'bar',
        data: {
          labels: ['March','April','May','June'],
          datasets: [
            { 
              data: [
                  monthly_data[0].positive,
                  monthly_data[1].positive,
                  monthly_data[2].positive,
                  monthly_data[3].positive
              ],
              label: "Positive",
              borderColor: "#4fca1d",
              type: "line",
              fill: false
            }, { 
              data: [
                  monthly_data[0].negative,
                  monthly_data[1].negative,
                  monthly_data[2].negative,
                  monthly_data[3].negative
              ],
              label: "Negative",
              borderColor: "#f94040",
              type: 'line',
              fill: false
            }, { 
              data: [
                monthly_data[0].neutral,
                monthly_data[1].neutral,
                monthly_data[2].neutral,
                monthly_data[3].neutral
              ],
              label: "Neutral",
              borderColor: "#3e9adc",
              type: 'line',
              fill: false
            },
            { 
                data: [
                    monthly_data[0].positive,
                    monthly_data[1].positive,
                    monthly_data[2].positive,
                    monthly_data[3].positive
                ],
                label: "Positive",
                backgroundColor: "#b4f799",
                type: "bar",
              }, { 
                data: [
                    monthly_data[0].negative,
                    monthly_data[1].negative,
                    monthly_data[2].negative,
                    monthly_data[3].negative
                ],
                label: "Negative",
                backgroundColor: "#ff8f8fd1",
                type: 'bar',
              }, { 
                data: [
                  monthly_data[0].neutral,
                  monthly_data[1].neutral,
                  monthly_data[2].neutral,
                  monthly_data[3].neutral
                ],
                label: "Neutral",
                backgroundColor: "#d7ecfb",
                type: 'bar',
              }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Month wise sentiment analysis of Covid19 data'
          },
          legend: {display: false}
        }
      });

    let monthInString = ["march", "april", "may", "june"];

    for(let i=0; i<4; i++) {
        makePieChart(
            Math.ceil( monthly_polarity[i].positive),
            Math.ceil(monthly_polarity[i].negative),
            Math.ceil(monthly_polarity[i].neutral),
            monthInString[i]
        );
    }

}

function parseData(table) {
    table.forEach( elt => {
        const row = elt.split(',');
        //console.log(row);
        let month = Number(row[3]);
        if(row[2]>0) {
            //positive
            monthly_data[month].positive++;
            monthly_polarity[month].positive += Number(Math.abs(row[0]));
        } else if(row[2]<0) {
            //negative
            monthly_data[month].negative++;
            monthly_polarity[month].negative += Number(Math.abs(row[0]));
        } else {
            //neutral
            monthly_data[month].neutral++;
            monthly_polarity[month].neutral+= 0.1;
        } 

    })
    
    console.log(monthly_data);
    console.log(monthly_polarity);
}

function makePieChart(pos, neg, nor, month) {
    //pie chart
    const data = {
        datasets: [{
            data: [pos, neg, nor],
            label: "Twitter Sentiment Data of "+month,
            backgroundColor: ["#6fe86f", "#ff8f8fd1","#d7ecfb"]
        }],

        labels: [
            'Positive',
            'Negative',
            'Neutral'
        ]
    };

    let id = month+"-chart";
    var ctx2 = document.getElementById(id).getContext('2d');

    var myPieChart = new Chart(ctx2, {
        type: 'doughnut',
        data: data,
        options: {
            title: {
              display: true,
              text: 'Sentiment Data of '+month
            }
          }
    });
}