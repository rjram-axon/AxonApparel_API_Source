CREATE TABLE [dbo].[Voucher]
(
	[VoucherId] [int] IDENTITY(1,1) NOT NULL,
	[Voucher] [varchar](50) NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1), 
    CONSTRAINT [PK_Voucher] PRIMARY KEY ([VoucherId])
)
