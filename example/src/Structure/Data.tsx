import { ResourceStructure, ProcessStructure } from "@elaraai/edk/lib";

export const Resource: ResourceStructure = {
  type: "resource",
  concept: "cash",
  marker: "cash",
  properties: {
    balance: {
      type: "float",
      kind: "temporal",
      parent: "cash",
      concept: "balance",
      marker: "cash",
      result_table: {
        name: "Result.cash.balance",
        hash:
          "4c14b779f4e134de4a4c3a0cf4bbe7303d04848080ebd10e3f4fcd0c09df32de",
        fields: {
          scenario: {
            type: "string",
            ast_type: "Variable",
            name: "scenario"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          sample: {
            type: {
              type: "struct",
              fields: {
                median: "float",
                upper: "float",
                lower: "float"
              }
            },
            ast_type: "Variable",
            name: "sample"
          },
          date: {
            type: "datetime",
            ast_type: "Variable",
            name: "date"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "StringJoin"
        },
        partitions: {
          by_scenario: {
            name: "Result.cash.balance.by_scenario",
            partition_key: {
              type: "string",
              ast_type: "Variable"
            },
            label: {
              type: "string",
              ast_type: "Variable"
            },
            dir: "desc"
          }
        },
        logging: true
      },
      sampling_period: 1,
      sampling_unit: "hour",
      sampling_function: {
        type: {
          type: "struct",
          fields: {
            median: "float",
            upper: "float",
            lower: "float"
          }
        },
        ast_type: "Struct",
        fields: {}
      }
    }
  },
  instance_table: {
    name: "Instance.cash",
    hash: "9cdd47be32f8dd3c81697dd94ccb176e2b99e0325bab858c430de9ab4e7812a4",
    fields: {
      marker: {
        type: "string",
        ast_type: "Variable",
        name: "marker"
      },
      balance: {
        type: "float",
        ast_type: "Variable",
        name: "balance"
      }
    },
    primary_key: {
      type: "string",
      ast_type: "Variable"
    },
    partitions: {
      all: {
        name: "Instance.cash.all",
        partition_key: null,
        label: null,
        dir: "desc"
      }
    },
    logging: true
  }
};

export const Process: ProcessStructure = {
  type: "process",
  concept: "sales",
  date: {
    type: "datetime",
    kind: "value",
    parent: "sales",
    concept: "date"
  },
  properties: {
    hour: {
      type: "integer",
      kind: "value",
      parent: "sales",
      concept: "hour"
    },
    cost: {
      type: "float",
      kind: "value",
      parent: "sales",
      concept: "cost"
    },
    price: {
      type: "float",
      kind: "option",
      parent: "sales",
      concept: "price",
      automatic: ["optimized"],
      proposal_request_table: {
        name: "ProposalRequest.sales.price",
        hash:
          "65f1460198b9e03de85f6ef0693e71a953c8c6f7802291e8945361b8626b076d",
        fields: {
          id: {
            type: "string",
            ast_type: "Variable",
            name: "id"
          },
          user: {
            type: "string",
            ast_type: "Variable",
            name: "user"
          },
          date: {
            type: "datetime",
            ast_type: "Variable",
            name: "date"
          },
          action: {
            type: "string",
            ast_type: "Variable",
            name: "action"
          },
          scenario: {
            type: "string",
            ast_type: "Variable",
            name: "scenario"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          value: {
            type: "float",
            ast_type: "Variable",
            name: "value"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "Variable"
        },
        partitions: {
          all: {
            name: "ProposalRequest.sales.price.all",
            partition_key: null,
            label: null,
            dir: "desc"
          }
        },
        logging: true
      },
      proposal_table: {
        name: "Proposal.sales.price",
        hash:
          "e1bfce4a521f2fed6256d64aaa0c0acc89aa7d4c2932adbaa82161c6245a27b6",
        fields: {
          scenario: {
            type: "string",
            ast_type: "Variable",
            name: "scenario"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          default_value: {
            type: "float",
            ast_type: "Variable",
            name: "default_value"
          },
          proposal_value: {
            type: "float",
            ast_type: "Variable",
            name: "proposal_value"
          },
          proposal_exists: {
            type: "boolean",
            ast_type: "Variable",
            name: "proposal_exists"
          },
          min: {
            type: "float",
            ast_type: "Variable",
            name: "min"
          },
          max: {
            type: "float",
            ast_type: "Variable",
            name: "max"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "StringJoin"
        },
        partitions: {
          by_scenario: {
            name: "Proposal.sales.price.by_scenario",
            partition_key: {
              type: "string",
              ast_type: "Variable"
            },
            label: {
              type: "string",
              ast_type: "Variable"
            },
            dir: "desc"
          }
        },
        logging: true
      },
      request_table: {
        name: "OptionRequest.sales.price",
        hash:
          "a20bfc711c5b9bc5a08e64d4b061f6c5320d553a86cca9477bd6f578071dfbdf",
        fields: {
          id: {
            type: "string",
            ast_type: "Variable",
            name: "id"
          },
          user: {
            type: "string",
            ast_type: "Variable",
            name: "user"
          },
          date: {
            type: "datetime",
            ast_type: "Variable",
            name: "date"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          value: {
            type: "float",
            ast_type: "Variable",
            name: "value"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "Variable"
        },
        partitions: {
          all: {
            name: "OptionRequest.sales.price.all",
            partition_key: null,
            label: null,
            dir: "desc"
          }
        },
        logging: true
      },
      result_table: {
        name: "Result.sales.price",
        hash:
          "9a1a375d56d1f214957ddb97db95d40da167235b52bdf31b3905e5146cbf9487",
        fields: {
          scenario: {
            type: "string",
            ast_type: "Variable",
            name: "scenario"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          value: {
            type: "float",
            ast_type: "Variable",
            name: "value"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "StringJoin"
        },
        partitions: {
          by_scenario: {
            name: "Result.sales.price.by_scenario",
            partition_key: {
              type: "string",
              ast_type: "Variable"
            },
            label: {
              type: "string",
              ast_type: "Variable"
            },
            dir: "desc"
          }
        },
        logging: true
      }
    },
    qty: {
      type: "float",
      kind: "function",
      parent: "sales",
      concept: "qty",
      function: {
        function: "ml",
        type: "float",
        parent: "sales",
        concept: "qty",
        sampling_mode: "sample",
        inputs: {},
        features: {
          Price: {
            type: "float",
            parent: "sales",
            concept: "price"
          },
          Hour: {
            type: "integer",
            parent: "sales",
            concept: "hour"
          }
        },
        output_type: "float",
        training_table: {
          name: "Training.sales.qty",
          hash:
            "9532c32501aa4ff5e1913e0564d658e4fe726a04eff4184f8c0c2a7fd709e866",
          fields: {
            version: {
              type: "integer",
              ast_type: "Variable",
              name: "version"
            },
            iteration: {
              type: "integer",
              ast_type: "Variable",
              name: "iteration"
            },
            date: {
              type: "datetime",
              ast_type: "Variable",
              name: "date"
            },
            marker: {
              type: "string",
              ast_type: "Variable",
              name: "marker"
            },
            Price: {
              type: "float",
              ast_type: "Variable",
              name: "Price"
            },
            Hour: {
              type: "integer",
              ast_type: "Variable",
              name: "Hour"
            },
            "qty (actual)": {
              type: "float",
              ast_type: "Variable",
              name: "qty (actual)"
            },
            "qty (sample)": {
              type: "float",
              ast_type: "Variable",
              name: "qty (sample)"
            },
            "qty (mean)": {
              type: "float",
              ast_type: "Variable",
              name: "qty (mean)"
            },
            "qty (lower)": {
              type: "float",
              ast_type: "Variable",
              name: "qty (lower)"
            },
            "qty (upper)": {
              type: "float",
              ast_type: "Variable",
              name: "qty (upper)"
            }
          },
          primary_key: {
            type: "string",
            ast_type: "Variable"
          },
          partitions: {
            all: {
              name: "Training.sales.qty.all",
              partition_key: null,
              label: null,
              dir: "desc"
            }
          },
          logging: true
        },
        feature_rank_table: {
          name: "FeatureRank.sales.qty",
          hash:
            "22c15a3727b98ccbfb5b6855fbf4a4d445e7b0573f27abeee0996a378434c4de",
          fields: {
            version: {
              type: "integer",
              ast_type: "Variable",
              name: "version"
            },
            iteration: {
              type: "integer",
              ast_type: "Variable",
              name: "iteration"
            },
            date: {
              type: "datetime",
              ast_type: "Variable",
              name: "date"
            },
            correlation: {
              type: {
                type: "dict",
                values: "float"
              },
              ast_type: "Variable",
              name: "correlation"
            }
          },
          primary_key: {
            type: "string",
            ast_type: "StringJoin"
          },
          partitions: {
            all: {
              name: "FeatureRank.sales.qty.all",
              partition_key: null,
              label: null,
              dir: "desc"
            }
          },
          logging: true
        },
        validation_table: {
          name: "Validation.sales.qty",
          hash:
            "30f330fa737ca0d5d7444094ad9885249a0ccfcb17c2159cefc7e0f6a0582834",
          fields: {
            version: {
              type: "integer",
              ast_type: "Variable",
              name: "version"
            },
            iteration: {
              type: "integer",
              ast_type: "Variable",
              name: "iteration"
            },
            date: {
              type: "datetime",
              ast_type: "Variable",
              name: "date"
            },
            statistics: {
              type: {
                type: "dict",
                values: "float"
              },
              ast_type: "Variable",
              name: "statistics"
            }
          },
          primary_key: {
            type: "string",
            ast_type: "StringJoin"
          },
          partitions: {
            all: {
              name: "Validation.sales.qty.all",
              partition_key: null,
              label: null,
              dir: "desc"
            }
          },
          logging: true
        }
      },
      result_table: {
        name: "Result.sales.qty",
        hash:
          "3d0492c0e5612c3be1d1a8e98f38dec61d1b142da9a054eef804f2b97391a2f2",
        fields: {
          scenario: {
            type: "string",
            ast_type: "Variable",
            name: "scenario"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          sample: {
            type: {
              type: "struct",
              fields: {
                "": "float"
              }
            },
            ast_type: "Variable",
            name: "sample"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "StringJoin"
        },
        partitions: {
          by_scenario: {
            name: "Result.sales.qty.by_scenario",
            partition_key: {
              type: "string",
              ast_type: "Variable"
            },
            label: {
              type: "string",
              ast_type: "Variable"
            },
            dir: "desc"
          }
        },
        logging: true
      },
      sampling_function: {
        type: {
          type: "struct",
          fields: {
            "": "float"
          }
        },
        ast_type: "Struct",
        fields: {
          "": {
            type: "float",
            ast_type: "Divide"
          }
        }
      }
    },
    profit: {
      type: "float",
      kind: "function",
      parent: "sales",
      concept: "profit",
      function: {
        function: "generic",
        type: "float",
        parent: "sales",
        concept: "profit",
        ast: {
          type: "float",
          ast_type: "Multiply"
        },
        inputs: {
          qty: {
            type: "float",
            parent: "sales",
            concept: "qty"
          },
          price: {
            type: "float",
            parent: "sales",
            concept: "price"
          },
          cost: {
            type: "float",
            parent: "sales",
            concept: "cost"
          }
        }
      },
      result_table: {
        name: "Result.sales.profit",
        hash:
          "21ea95954c01cf6adcc83bdf7baa23f93452cc365fd850a76e892ccb41b40c14",
        fields: {
          scenario: {
            type: "string",
            ast_type: "Variable",
            name: "scenario"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          sample: {
            type: {
              type: "struct",
              fields: {
                "": "float"
              }
            },
            ast_type: "Variable",
            name: "sample"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "StringJoin"
        },
        partitions: {
          by_scenario: {
            name: "Result.sales.profit.by_scenario",
            partition_key: {
              type: "string",
              ast_type: "Variable"
            },
            label: {
              type: "string",
              ast_type: "Variable"
            },
            dir: "desc"
          }
        },
        logging: true
      },
      sampling_function: {
        type: {
          type: "struct",
          fields: {
            "": "float"
          }
        },
        ast_type: "Struct",
        fields: {
          "": {
            type: "float",
            ast_type: "Divide"
          }
        }
      }
    },
    cash_balance: {
      type: "float",
      kind: "function",
      parent: "sales",
      concept: "cash_balance",
      function: {
        function: "getproperty",
        type: "float",
        parent: "sales",
        concept: "cash_balance",
        property_parent: "cash",
        property_concept: "balance",
        inputs: {
          date: {
            type: "datetime",
            parent: "sales",
            concept: "date"
          }
        }
      },
      result_table: {
        name: "Result.sales.cash_balance",
        hash:
          "4560fd0948adc2ee2dd59003839884931b9155f41ed94e30e7b46aa40a3dbf2c",
        fields: {
          scenario: {
            type: "string",
            ast_type: "Variable",
            name: "scenario"
          },
          marker: {
            type: "string",
            ast_type: "Variable",
            name: "marker"
          },
          sample: {
            type: {
              type: "struct",
              fields: {
                "": "float"
              }
            },
            ast_type: "Variable",
            name: "sample"
          }
        },
        primary_key: {
          type: "string",
          ast_type: "StringJoin"
        },
        partitions: {
          by_scenario: {
            name: "Result.sales.cash_balance.by_scenario",
            partition_key: {
              type: "string",
              ast_type: "Variable"
            },
            label: {
              type: "string",
              ast_type: "Variable"
            },
            dir: "desc"
          }
        },
        logging: true
      },
      sampling_function: {
        type: {
          type: "struct",
          fields: {
            "": "float"
          }
        },
        ast_type: "Struct",
        fields: {
          "": {
            type: "float",
            ast_type: "Divide"
          }
        }
      }
    }
  },
  events: {
    increment_cash: {
      type: "float",
      process: "sales",
      event: "increment_cash",
      kind: "single",
      property: {
        type: "float",
        parent: "cash",
        concept: "balance"
      },
      marker: {
        type: "string",
        kind: "value",
        parent: "sales",
        concept: "increment_cash.marker"
      },
      value: {
        type: "float",
        kind: "function",
        parent: "sales",
        concept: "increment_cash.value",
        function: {
          function: "generic",
          type: "float",
          parent: "sales",
          concept: "increment_cash.value",
          ast: {
            type: "float",
            ast_type: "Add"
          },
          inputs: {
            cash_balance: {
              type: "float",
              parent: "sales",
              concept: "cash_balance"
            },
            profit: {
              type: "float",
              parent: "sales",
              concept: "profit"
            }
          }
        },
        result_table: {
          name: "Result.sales.increment_cash.value",
          hash:
            "fd0dd4fe3af1a7590731735150ab385e2d4a5c52a1f24babdafc2775c748ef8f",
          fields: {
            scenario: {
              type: "string",
              ast_type: "Variable",
              name: "scenario"
            },
            marker: {
              type: "string",
              ast_type: "Variable",
              name: "marker"
            },
            sample: {
              type: {
                type: "struct",
                fields: {
                  "": "float"
                }
              },
              ast_type: "Variable",
              name: "sample"
            }
          },
          primary_key: {
            type: "string",
            ast_type: "StringJoin"
          },
          partitions: {
            by_scenario: {
              name: "Result.sales.increment_cash.value.by_scenario",
              partition_key: {
                type: "string",
                ast_type: "Variable"
              },
              label: {
                type: "string",
                ast_type: "Variable"
              },
              dir: "desc"
            }
          },
          logging: true
        },
        sampling_function: {
          type: {
            type: "struct",
            fields: {
              "": "float"
            }
          },
          ast_type: "Struct",
          fields: {
            "": {
              type: "float",
              ast_type: "Divide"
            }
          }
        }
      }
    }
  },
  instance_table: {
    name: "Instance.cash",
    hash: "9cdd47be32f8dd3c81697dd94ccb176e2b99e0325bab858c430de9ab4e7812a4",
    fields: {
      marker: {
        type: "string",
        ast_type: "Variable",
        name: "marker"
      },
      balance: {
        type: "float",
        ast_type: "Variable",
        name: "balance"
      }
    },
    primary_key: {
      type: "string",
      ast_type: "Variable"
    },
    partitions: {
      all: {
        name: "Instance.cash.all",
        partition_key: null,
        label: null,
        dir: "desc"
      }
    },
    logging: true
  }
};
