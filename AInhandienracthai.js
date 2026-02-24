const AIURL = './model/';
let model;

async function loadModel() {
        model = await tmImage.load(
        AIURL + 'model.json',
        AIURL + 'metadata.json'
    );
        console.log(model); 
}
window.onload = function() {
    loadModel();
    console.log("Model loaded");
};  

let fileinfo = document.getElementById('fileInfo');

document.getElementById('imageUpload').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        let filename = this.files[0].name;

            if(filename.length > 30){
                filename = filename.substring(0,30) + "...";
            }

            fileinfo.textContent = `Đã chọn tệp: ${filename}`;
         }  else {
        fileinfo.textContent = 'Chưa chọn tệp nào';
    }
});
let previewImage = document.getElementById('previewImage');

document.getElementById('imageUpload').addEventListener('change', function() {
    let preview = this.files[0];
    let imageURL = URL.createObjectURL(preview);
    console.log(imageURL);
    previewImage.src = imageURL;
    previewImage.style.display = 'block';
});

function resizeImage (image,size=224) {
    console.log('Got Image');
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    
    canvas.width = size;
    canvas.height = size;

    ctx.drawImage(image,0,0,size,size);

    return canvas;
}


let ketqua = document.getElementById('thongbaoketqua');

let icon1 = document.getElementById('icon1');
let icon2 = document.getElementById('icon2');
let icon3 = document.getElementById('icon3');

let solution1 = document.getElementById('solution1');
let solution2 = document.getElementById('solution2');
let solution3 = document.getElementById('solution3');

let motasolu1 = document.getElementById('motasolu1');
let motasolu2 = document.getElementById('motasolu2');
let motasolu3 = document.getElementById('motasolu3');

let nhandien = document.getElementById('nutnhandien');


document.getElementById('imageUpload').addEventListener('change',function() {
    nhandien.textContent='Nhận Diện';

    ketqua.textContent='...';
    ketqua.style.color='rgb(0, 0, 0)';
    ketqua.style.fontSize='1.5vw';

    icon1.src = '../Images/iconenvironment.jpg';
    icon2.src = '../Images/iconenvironment.jpg'
    icon3.src = '../Images/iconenvironment.jpg'

    solution1.textContent = 'Ủ Phân Compost Tại Nguồn'
    solution2.textContent = 'Thu Gom Riêng Tại Gia Đình'
    solution3.textContent = 'Tận Dụng Làm Thức Ăn Chăn Nuôi'

    motasolu1.textContent = '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
    motasolu2.textContent = '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
    motasolu3.textContent = '-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
                
    
    nhandien.onclick = predict;
    
});

async function predict() {

    nhandien.textContent='Đang Nhận Diện';
    
    let image = document.getElementById('previewImage');
    let resizedImage = resizeImage(image,224);

    let prediction = await model.predict(resizedImage);
    console.log(prediction);



    nhandien.textContent='Xem Kết Quả';
    nhandien.onclick = function () {

        let detected = false;

        prediction.forEach(item => {
            if(item.className==='RacHuuCo' && item.probability >= 0.8) {
                console.log('Nhandienrachuuco');
                ketqua.textContent='Rác Hữu Cơ 🥬';
                ketqua.style.color='rgb(31, 81, 46)';
                ketqua.style.fontSize='1.5vw';

                icon1.src = '../Images/uphan.jpg';
                icon2.src = '../Images/thugom.jpg'
                icon3.src = '../Images/thucanchannuoi.jpg'

                solution1.textContent = 'Ủ Phân Compost Tại Nguồn'
                solution2.textContent = 'Thu Gom Riêng Tại Gia Đình'
                solution3.textContent = 'Tận Dụng Làm Thức Ăn Chăn Nuôi'

                motasolu1.textContent = 'Thu gom thức ăn thừa, vỏ rau củ, lá cây để ủ thành phân compost. Phương pháp này giúp giảm lượng rác ra bãi chôn lấp, hạn chế mùi hôi và khí nhà kính. Phân hữu cơ tạo ra có thể dùng bón cây trong vườn, trường học hoặc công viên, tiết kiệm chi phí và cải tạo đất hiệu quả.'
                motasolu2.textContent = 'Thiết lập thùng rác riêng cho rác hữu cơ giúp việc xử lý thuận tiện hơn. Khi được phân loại đúng, rác hữu cơ dễ dàng đưa vào hệ thống xử lý sinh học hoặc sản xuất phân bón. Điều này giảm ô nhiễm và nâng cao ý thức phân loại rác trong cộng đồng.'
                motasolu3.textContent = 'Một số loại thực phẩm thừa như cơm, rau củ có thể xử lý sạch và tận dụng làm thức ăn cho gia súc. Biện pháp này giúp giảm lãng phí thực phẩm và tiết kiệm chi phí chăn nuôi, đồng thời hạn chế rác thải ra môi trường.'
                
                detected=true;

            } else if(item.className==='RacNhua' && item.probability >= 0.8) {
                console.log('Nhandienracnhua');
                ketqua.textContent='Rác Nhựa 🧴';
                ketqua.style.color='rgb(59, 141, 255)';
                ketqua.style.fontSize='1.5vw';

                icon1.src = '../Images/hanchenhuadung1lan.jpg'
                icon2.src = '../Images/taiche.jpg'
                icon3.src = '../Images/chuongtrinhthuhoi.jpg'

                solution1.textContent = 'Hạn Chế Nhựa Dùng Một Lần'
                solution2.textContent = 'Tái Chế Và Phân Loại Đúng Cách'
                solution3.textContent = 'Chương Trình Thu Hồi Bao Bì'

                motasolu1.textContent = 'Giảm sử dụng túi nylon, ống hút, hộp nhựa dùng một lần bằng cách thay thế bằng sản phẩm tái sử dụng như túi vải hoặc bình nước cá nhân. Thói quen nhỏ này có thể giảm đáng kể lượng nhựa thải ra môi trường mỗi ngày.'
                motasolu2.textContent = 'Thu gom chai nhựa, hộp nhựa riêng biệt và chuyển đến điểm tái chế. Nhựa có thể được xử lý để sản xuất thành vật dụng mới như ghế, thùng rác hoặc sợi dệt, góp phần tiết kiệm tài nguyên và giảm ô nhiễm đại dương.'
                motasolu3.textContent = 'Khuyến khích cửa hàng và siêu thị triển khai chương trình thu hồi chai nhựa, bao bì sau sử dụng. Người dân mang vỏ chai đến trả có thể nhận ưu đãi nhỏ, tạo động lực tái chế và xây dựng thói quen tiêu dùng bền vững.'
                
                detected=true;

            } else if(item.className==='Giay' && item.probability >= 0.8) {
                console.log('Nhandiengiay');
                ketqua.textContent='Giấy 📄';
                ketqua.style.color='rgb(206, 71, 86)';
                ketqua.style.fontSize='1.5vw';


                icon1.src = '../Images/taiche.jpg'
                icon2.src = '../Images/thugom.jpg'
                icon3.src = '../Images/sohoatailieu.jpg'

                solution1.textContent = 'Tái Sử Dụng Hai Mặt Giấy'
                solution2.textContent = 'Thu Gom Tái Chế Định Kỳ'
                solution3.textContent = 'Số Hóa Tài Liệu'

                motasolu1.textContent = 'Khuyến khích in ấn hai mặt hoặc tận dụng giấy một mặt làm giấy nháp. Biện pháp đơn giản này giúp giảm nhu cầu sản xuất giấy mới, tiết kiệm cây xanh và năng lượng tiêu thụ trong quá trình sản xuất.'
                motasolu2.textContent = 'Thiết lập điểm thu gom giấy tại trường học, văn phòng hoặc khu dân cư. Giấy thu hồi có thể tái chế thành giấy mới, bìa carton hoặc vật liệu đóng gói, giúp giảm lượng rác thải và bảo vệ tài nguyên rừng.'
                motasolu3.textContent = 'Giảm in ấn bằng cách lưu trữ tài liệu dưới dạng điện tử. Việc sử dụng email, tài liệu PDF và nền tảng trực tuyến giúp tiết kiệm giấy, giảm chi phí văn phòng và góp phần bảo vệ môi trường lâu dài.'
                
                detected=true;

            } else if(item.className==='KimLoai' && item.probability >= 0.8) {
                console.log('Nhandienkimloai');
                ketqua.textContent='Kim Loại 🔩';
                ketqua.style.color='rgb(93, 93, 93)';
                ketqua.style.fontSize='1.5vw';

                icon1.src = '../Images/thugom.jpg'
                icon2.src = '../Images/taiche.jpg'
                icon3.src = '../Images/suachua.jpg'

                solution1.textContent = 'Thu Gom Lon Và Phế Liệu'
                solution2.textContent = 'Tái Chế Tại Cơ Sở Chuyên Biệt'
                solution3.textContent = 'Sửa Chữa Và Tái Sử Dụng'

                motasolu1.textContent = 'Lon nhôm, sắt vụn nên được thu gom riêng để bán cho cơ sở tái chế. Kim loại có giá trị tái chế cao và có thể tái sử dụng nhiều lần mà không mất chất lượng, giúp tiết kiệm tài nguyên khai thác từ thiên nhiên.'
                motasolu2.textContent = 'Kim loại sau thu gom được nấu chảy và tái tạo thành sản phẩm mới. Quá trình này tiêu tốn ít năng lượng hơn so với khai thác quặng mới, giảm phát thải khí nhà kính và bảo vệ môi trường.'
                motasolu3.textContent = 'Các vật dụng kim loại như dụng cụ gia đình hoặc đồ nội thất nên được sửa chữa trước khi bỏ đi. Tái sử dụng kéo dài vòng đời sản phẩm và giảm nhu cầu sản xuất mới.'
                
                detected=true;

            } else if(item.className==='ThuyTinh' && item.probability >= 0.8) {
                console.log('Nhandienthuytinh');
                ketqua.textContent='Thủy Tinh 🧪';
                ketqua.style.color='rgb(144, 220, 255)';
                ketqua.style.fontSize='1.5vw';

                icon1.src = '../Images/phanloaitheomau.jpg'
                icon2.src = '../Images/taiche.jpg'
                icon3.src = '../Images/chuongtrinhthuhoi.jpg'

                solution1.textContent = 'Phân Loại Theo Màu'
                solution2.textContent = 'Tái Sử Dụng Chai Lọ'
                solution3.textContent = 'Thu Hồi Qua Hệ Thống Đặt Cọc'

                motasolu1.textContent = 'Thủy tinh nên được phân loại theo màu (trong, xanh, nâu) để tăng hiệu quả tái chế. Phân loại đúng giúp quá trình nấu chảy và tái sản xuất diễn ra thuận lợi hơn.'
                motasolu2.textContent = 'Chai lọ thủy tinh có thể rửa sạch và tái sử dụng nhiều lần để đựng thực phẩm hoặc đồ uống. Điều này giúp giảm rác thải và tiết kiệm chi phí mua mới.'
                motasolu3.textContent = 'Áp dụng hệ thống đặt cọc khi mua sản phẩm đựng trong chai thủy tinh. Người tiêu dùng trả vỏ chai sẽ nhận lại tiền cọc, khuyến khích tái sử dụng và giảm rác thải.'
                
                detected=true;    
            
            } else if(item.className==='Carboard' && item.probability >= 0.8) {
                console.log('Nhandienbiacarton');
                ketqua.textContent='Cardboard (Bìa Carton) 📦';
                ketqua.style.color='rgb(71, 65, 19)';
                ketqua.style.fontSize='1.5vw';

                icon1.src = '../Images/taiche.jpg'
                icon2.src = '../Images/hanchenhuadung1lan.jpg'
                icon3.src = '../Images/giukhotruockhithugom.jpg'

                solution1.textContent = 'Tái Chế Bao Bì'
                solution2.textContent = 'Tận Dụng Làm Vật Dụng'
                solution3.textContent = 'Giữ Khô Trước Khi Thu Gom'

                motasolu1.textContent = 'Thùng carton sau sử dụng nên được gấp gọn và chuyển đến điểm thu gom tái chế. Vật liệu này dễ tái chế và có thể sản xuất thành hộp mới hoặc giấy bìa khác.'
                motasolu2.textContent = 'Bìa carton có thể tái sử dụng làm hộp lưu trữ, đồ thủ công hoặc vật liệu bảo vệ khi vận chuyển. Cách này giúp giảm nhu cầu sản xuất bao bì mới.'
                motasolu3.textContent = 'Cardboard cần được bảo quản khô ráo trước khi tái chế. Nếu bị ướt hoặc dính dầu mỡ, khả năng tái chế giảm đáng kể. Vì vậy cần lưu trữ đúng cách để đảm bảo hiệu quả xử lý.'
                
                detected=true;

            } 
            window.location.href="#ketquanhandien";
                
        });
        if(!detected) {
            alert('KHÔNG THỂ NHẬN DIỆN ẢNH DO BẠN CUNG CẤP. VUI LÒNG TẢI LÊN ẢNH CHI TIẾT HƠN!');
            window.location.href="#AInhandienracthai";
        }
    }

}
