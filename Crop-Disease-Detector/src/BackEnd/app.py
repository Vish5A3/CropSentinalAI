from flask import Flask, render_template, send_from_directory, request, jsonify
import sqlite3
#import torch
#import torchvision.transforms as transforms

app = Flask(__name__, template_folder="../FrontEnd/src/dist")

# Database setup
db = sqlite3.connect('crop_data.db', check_same_thread=False)
cursor = db.cursor()

# Create table if it doesn't exist
cursor.execute('''CREATE TABLE IF NOT EXISTS crops
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                     image_path TEXT NOT NULL,
                     outputClass TEXT)''')
db.commit()

@app.route('/', methods=['GET'])
def serve_index():
     return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect_crop():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}, 400)
    else:
        image = request.files['image']
        
        # Save the image to a temporary file
        image.save('temp.jpg')

        # Load the crop detection model
        model =  torch.load('model.h5')

        model.eval()

        with torch.no_grad():
            # Load the image
            image = Image.open('temp.jpg').convert('RGB')
            transform = transforms.Compose([
                torchvision.transforms.Resize((256, 256)),
                torchvision.transforms.ToTensor(),
            ])
            # Preprocess the image
            image = transforms(image)

            # Make a prediction
            output = model(image)
            _, predicted = torch.max(outputs, 1)
            print(f"{predicted}")
            print("image received")
            # Store crop type in the database
            #cursor.executeINSERT INTO crops (image_path, output) VALUES (?, ?), ('temp.jpg', 'Apple'))

        db.commit()

        return jsonify({'output': "Apple Healthy Leaf"})

def class_name(predicted_class):
    classes = [
                Apple_Apple_scab, Apple_Black_rot
                Apple_Cedar_apple_rust, Apple_healthy
                Blueberry_healthy,
                Cherry_(including_sour)_healthy, Cherry_(including_sour)_Powdery_mildew
                Corn_Cercospora_leaf_spot_Gray_leaf_spot, Corn_Common_rust_
                Corn_healthy, Corn_Northern_Leaf_Blight
                Grape_Black_rot, Grape_Esca_(Black_Measles)
                Grape_healthy, Grape_Leaf_blight_(Isariopsis_Leaf_Spot)
                Orange_Haunglongbing_(Citrus_greening),
                Peach_Bacterial_spot, Peach_healthy
                Pepper_bell_Bacterial_spot, Pepper_bell_healthy
                Potato_Early_blight, Potato_healthy
                Potato_Late_blight, Raspberry_healthy
                Rice_Bacterial Leaf Blight, Rice_Blast
                Rice_Healthy, Rice_Tungro
                Soybean_healthy, Squash_Powdery_mildew
                Strawberry_healthy, Strawberry_Leaf_scorch
                Tomato_Bacterial_spot, Tomato_Early_blight
                Tomato_healthy, Tomato_Late_blight
                Tomato_Leaf_Mold, Tomato_Septoria_leaf_spot
                Tomato_Spider_mites, Tomato_Target_Spot
                Tomato_Tomato_mosaic_virus, Tomato_Tomato_Yellow_Leaf_Curl_Virus
               ]

    return classes[predicted_class]


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
