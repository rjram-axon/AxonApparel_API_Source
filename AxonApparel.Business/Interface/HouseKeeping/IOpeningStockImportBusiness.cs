﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IOpeningStockImportBusiness
    {
        Response<Domain.ItmStkDet> GetListUserStatus(Domain.ItmStkDet data);
    }
}
