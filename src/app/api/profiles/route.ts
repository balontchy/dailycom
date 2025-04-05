import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const dbName = 'daily';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const profile = await req.json();

    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const profilesCollection = db.collection('profiles');

    // Insert the profile data into the database
    const result = await profilesCollection.insertOne(profile);

    // Close the database connection
    client.close();

    // Respond with success
    return NextResponse.json({ message: 'Profile created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // Extract the email from query parameters

  if (!email) {
    return NextResponse.json({ message: 'Email query parameter is required' }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const profilesCollection = db.collection('profiles');

    // Find the profile by email
    const profile = await profilesCollection.findOne({ email });

    // Close the database connection
    client.close();

    if (!profile) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
    }

    // Respond with the profile data
    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // Extract the email from query parameters

  if (!email) {
    return NextResponse.json({ message: 'Email query parameter is required' }, { status: 400 });
  }

  try {
    // Parse the request body
    const updatedProfile = await req.json();

    // Connect to MongoDB
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    const profilesCollection = db.collection('profiles');

    // Update the profile by email
    const result = await profilesCollection.updateOne(
      { email }, // Match the profile by email
      { $set: updatedProfile }
    );

    // Close the database connection
    client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Profile not found' }, { status: 404 });
    }

    // Respond with success
    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}