CREATE TABLE [dbo].[BuyerCharges]
(
	[BuyerchargesId] [int] IDENTITY(1,1) NOT NULL primary key,
	[BuyerId] [int] NULL,
	[FromQuantity] [numeric](15, 5) NULL,	
	[ToQuantity] [numeric](15, 5) NULL,
	[ShippingExpense] [numeric](15, 5) NULL,
	CIFExpense [numeric](15, 5) null,
	BankExpense [numeric](15, 5) null	
	 CONSTRAINT [FK_Charge_Buyer] FOREIGN KEY ([BuyerId]) REFERENCES [Buyer]([BuyerId]),	
)
