CREATE TABLE [dbo].[MerchTeamBuyer]
(
	MechTeamBuyerId INT NOT NULL PRIMARY KEY identity(1,1),
	TeamId [int] NULL,
	BuyerId int NULL,
	CONSTRAINT [FK_Team] FOREIGN KEY (TeamId) REFERENCES [MerchTeamMas]([TeamId]),
	CONSTRAINT [FK_TeamBuyerId] FOREIGN KEY (BuyerId) REFERENCES Buyer(BuyerId),
)
