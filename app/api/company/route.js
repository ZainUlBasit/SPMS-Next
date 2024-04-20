import connectDB from "@/utils/db";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} from "../../../controllers/CompanyController";
import { createError, successMessage } from "@/utils/ResponseMessage";
import Company from "@/models/Company";
import { NextResponse } from "next/server";

connectDB();

export async function POST(req, res) {
  //   const data = ;
  //   return successMessage(res, data, "nothing");
  const reqBody = await req.json();
  console.log(reqBody);
  const { name, contact, email, cnic, desc, address } = reqBody;
  if (!name || !contact || !desc || !address || !email || !cnic) {
    return Response.json({
      success: false,
      error: "Required fields are undefined!",
    });
  }
  try {
    const company = new Company({
      name,
      contact,
      desc,
      address,
      email,
      cnic,
    });
    await company.save();
    if (!company)
      return Response.json({
        success: false,
        error: "Unable to Add Company!",
      });
    else
      return Response.json({
        success: false,
        data: {
          payload: company,
          msg: "Company Successfully Added!",
        },
      });
  } catch (err) {
    return Response.json({
      success: false,
      error: err.message,
    });
  }
}
