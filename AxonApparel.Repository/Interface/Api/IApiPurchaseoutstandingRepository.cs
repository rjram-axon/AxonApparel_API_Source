﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface.Api
{
    public interface IApiPurchaseoutstandingRepository
    {
        IQueryable<Proc_Apparel_ApiSupplierOutstandingPurchase_Result> GetPurchaseoutstanding();

        IQueryable<Proc_Apparel_ApiSupplierOutstandingPurchasedetails_Result> GetPurchasesupplierdetails(int supplierid);
    }
}
