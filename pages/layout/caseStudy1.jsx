import React from 'react'
import FlowerSubscribe from '../../Components/FlowerDemo/FlowerSubscribe';
import Layout4 from '../../Layout/Layout4'
import Enquire from './Enquire';
import Head from 'next/head';
import ShareSocial from '../../Components/Products/Product4ImageContain/ShareSocial';
import RelatedPosts from './RelatedPosts';
import AddComments from '../../Components/Products/Common/AddComments';

const caseStudy1 = () => {
    return (
        <Layout4>
            <Head>
                <title>Unbox Industry</title>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel="icon" href="/Box.ico" />
            </Head>
            <div className='container mt-2 mb-4'>
                <h2 className='text-center fw-bold' style={{ color: '#FF8400', fontSize: '40px' }}>Milling and Turning: What Can Cobots Bring To The Table?</h2>
                <img src='/caseStudy1.jpg' width={500} height={500} style={{ marginLeft: '300px' }} />
                <h3 style={{ fontSize: '30px' }}>Milling and Turning: What Can Cobots Bring To The Table?</h3>
                <img src='/milling.webp' width={700} height={500} />
                <p className='mt-2' style={{ fontSize: '25px', fontFamily: '"Libre Baskerville", "Times New Roman", Times, serif', lineHeight: '1.2' }}>Collaborative robots are becoming widely used in manufacturing. As the technology matures, more companies are able to afford these robots to help them with their production.</p>
                <h4 className='mb-1 fw-bold' style={{fontSize:'25px'}}>Cobots and their advantages.</h4>
                <p>Collaborative robots or cobots are a subset of robots designed to be able to work alongside human employees safely and effectively.<br/><br/>As robots can take over many laborious and potentially dangerous tasks from humans, the employees can be shifted to activities that can generate higher value for their companies. The use of robots also provides value to workers, as they get to work on more meaningful and complex tasks, decreasing the chance of overuse injuries, lack of motivation, fluctuation, and saving time.</p>
                <h5 className='mb-1 fw-bold' style={{fontSize:'20px'}}>How can cobots help out?</h5>
                <p>Activities in machining are traditionally thought of as labor-intensive activities, requiring the alert presence of an experienced operator. As robots take over some of the elements of these activities, manufacturers can realize higher productivity, lower costs, and scrap materials from the production. The generalist nature of robots also allows for more flexibility in the production processes as opposed to CNC machines, by decreasing the time needed for resetting them for tasks on demand. <br/><br/>Working around heavy machinery always brings the question of safety to the forefront. As operators have to be less involved in the actual process of the milling and turning, the chance of harm can be drastically reduced.<br/><br/>Automation used to be a privilege of big manufacturers decades ago, as the assets and programming of these robots were demanding in terms of cost, time, and other resources such as expertise. As technology is evolving, the entry barriers that were keeping small and medium-sized companies (SMEs) are breaking down. Today, SMEs are also able to reap the benefits of automation, with the lowering costs of robotic assets, software in the toolbelt.</p>
                <h5 className='mb-1 fw-bold' style={{fontSize:'20px'}}>But how do cobots stack up against CNC machines?</h5>
                <p>CNC machines are generally used to handle one specific machining task. This level of specificity provides high accuracy, performance, and quality in the given task. However, the use of these machines can be less flexible when adjustments in the production process are necessary.
                <br/><br/>Presently, the use of robots and cobots is generally limited to handling operations, such as welding, sorting, and painting. Automated, robot-managed machining systems are capable of performing a wider-variety of machining tasks, and they can be invaluable assets when flexibility is vital for the manufacturer. Moreover, with technological advancement, modern robotic machinery platforms are more compact and occupy less space than their earlier versions.
                <br/><br/>Flexibility is becoming a more prevalent determining characteristic for successful businesses, to meet the highly customized and rapidly changing needs of their customers. For this reason, robots are becoming better alternatives to traditional CNC machines in manufacturing tasks, such as milling and turning.
                <br/><br/>Despite some current obstacles that robots in machining are facing, both the technological and economic trends are leaning towards the wider application of robots.
                <br/><br/>In the coming years, research shows we are likely to experience an increase in the application of robots in machining. Tasks such as milling and turning will be mostly automated, as the technological progress in robot-managed machining systems is overcoming the obstacles that were keeping them from widespread use.
                </p>
                <ShareSocial/>
            </div>
            <RelatedPosts/>
            <div className='container mb-3 mt-5'>
            <AddComments />
            </div>
            <Enquire />
            <FlowerSubscribe />
        </Layout4>
    )
}

export default caseStudy1
