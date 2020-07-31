getCSV();
let pos =0, neg=0, nor=0;

async function getCSV() {
    const response = await fetch('analyzedData/test2.csv');
    const CSVdata = await response.text();

    const table = CSVdata.split('\n').slice(1);
    console.log(table);

    table.forEach( elt => {
        const row = elt.split(',');
        pos = pos+Number(row[0]);
        neg = neg+Number(row[1]);
        nor = nor+Number(row[2]);
    })
    console.log(pos);
    console.log(neg);
    if(nor<0) nor = -(Number(nor));
    console.log(nor);
    let total = pos+neg+nor;
    console.log(total);
    


    var ctx = document.getElementById('myChart').getContext('2d');


    //bar chart------------------------------

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Positive', 'Negative', 'Neutral'],
        datasets: [{
            label: 'Sentiment points',
            data: [pos, neg, nor],
            backgroundColor: [
                'rgba(173,255,47,0.5)',  
                'rgba(255,127,80,0.6)',
                'rgba(54, 162, 235, 0.5)'
            ],
            borderColor: [
                'rgba(173,255,47,0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(54, 162, 235, 0.5)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Twiiter Sentiment Analysis of Covid19 data in sentiment points'
    }
}});

pos = Math.ceil( (pos/total)*100 ) ;
    neg = Math.ceil( (neg/total)*100 ) ;
    nor = Math.ceil( (nor/total)*100 ) ;

    //pie chart
    const data = {
        datasets: [{
            data: [pos, neg, nor],
            label: "Twitter Sentiment Data",
            backgroundColor: ["#6fe86f", "#ea5f49","#d7ecfb"]
        }],

        labels: [
            'Positive',
            'Negative',
            'Neutral'
        ]
    };

    var ctx2 = document.getElementById('pie-chart').getContext('2d');

    var myPieChart = new Chart(ctx2, {
        type: 'doughnut',
        data: data,
        options: {
            title: {
              display: true,
              text: 'Twiiter Sentiment Analysis of Covid19 data in percentage'
            }
          }
    });

}







