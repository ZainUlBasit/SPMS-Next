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
import { updateCompanyLogo, uploadCompanyLogoFile } from "@/utils/firebase";

connectDB();

export async function POST(req, res) {
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
    // const logoUrl = await uploadCompanyLogoFile(name, logo);
    const company = new Company({
      name,
      contact,
      desc,
      address,
      email,
      cnic,
      total: 0,
      paid: 0,
      remaining: 0,
      // logo: logoUrl,
    });
    await company.save();
    if (!company) return createError(res, 400, "Unable to Add Company!");
    else return successMessage(res, company, "Company Successfully Added!");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
export async function GET(req, res) {
  try {
    const company = await Company.find();
    if (!company) return createError(res, 400, "Unable to Get Companies data!");
    else return successMessage(res, company, "");
  } catch (err) {
    return createError(res, 500, err.message || "Internal server error!");
  }
}
export async function PATCH(req, res) {
  const reqBody = await req.json();
  console.log(reqBody);
  const { name, contact, email, cnic, desc, address, companyId, logo } =
    reqBody;

  let logoUrl;

  if (typeof logo === "string") {
    // If the logo is already a string (i.e., a URL), use it directly
    logoUrl = logo;
  } else {
    // Otherwise, assume it's a file and upload it to get the URL
    logoUrl = await updateCompanyLogo(name, logo);
  }

  const Payload = {
    name,
    contact,
    email,
    cnic,
    desc,
    address,
    logo: logoUrl,
  };

  if (
    companyId === "" ||
    name === "" ||
    contact === "" ||
    email === "" ||
    cnic === "" ||
    desc === "" ||
    logo === "" ||
    address === ""
  ) {
    return createError(res, 422, "Required field are undefined!");
  }

  try {
    let company = await Company.findById(companyId);
    if (!company)
      return createError(res, 404, "Customer with such id was not found!");
    // Update item properties
    Object.assign(company, Payload);
    // Save the updated item
    await company.save();
    return successMessage(res, company, "Company Successfully Updated!");
  } catch (err) {
    console.log(err);
    return createError(res, 500, err.message || err);
  }
}

export async function DELETE(req, res) {
  const reqBody = await req.json();
  const { companyId } = reqBody;
  if (!companyId) return createError(res, 422, "Invalid Customer Id!");

  try {
    const DeleteCompany = await Company.findByIdAndDelete(companyId);
    if (!DeleteCompany)
      return createError(
        res,
        400,
        "Such Company with companyId does not exist!"
      );
    else
      return successMessage(
        res,
        DeleteCompany,
        `${DeleteCompany.name} is successfully deleted!`
      );
  } catch (err) {
    return createError(res, 500, err.message || err);
  }
}
